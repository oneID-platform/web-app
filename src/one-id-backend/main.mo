import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Int "mo:base/Int";

actor OneIDPlatform {
    // Types remain the same
    public type DocumentType = {
        #NIN;
        #BVN;
        #Passport;
        #VotersCard;
    };

    public type VerificationStatus = {
        #Pending;
        #Verified;
        #Rejected;
    };

    public type Document = {
        documentType: DocumentType;
        documentNumber: Text;
        imageHash: ?Text;
        verificationStatus: VerificationStatus;
        submissionTime: Time.Time;
        verificationTime: ?Time.Time;
        aiVerificationResult: ?Text;
    };

    public type UserProfile = {
        documents: [Document];
        authorizedApps: [AppAuthorization];
        lastUpdated: Time.Time;
    };

    public type AppAuthorization = {
        appId: Principal;
        name: Text;
        scopes: [DocumentType];
        authorized: Bool;
        authorizationTime: Time.Time;
    };

    public type ThirdPartyApp = {
        name: Text;
        description: Text;
        redirectUri: Text;
        clientSecret: Text;
        allowedScopes: [DocumentType];
        registrationTime: Time.Time;
    };

    // State variables remain the same
    private stable var userEntries : [(Principal, UserProfile)] = [];
    private stable var appEntries : [(Principal, ThirdPartyApp)] = [];
    
    private var users = HashMap.HashMap<Principal, UserProfile>(0, Principal.equal, Principal.hash);
    private var registeredApps = HashMap.HashMap<Principal, ThirdPartyApp>(0, Principal.equal, Principal.hash);

    // System upgrade functions remain the same
    system func preupgrade() {
        userEntries := Iter.toArray(users.entries());
        appEntries := Iter.toArray(registeredApps.entries());
    };

    system func postupgrade() {
        users := HashMap.fromIter<Principal, UserProfile>(userEntries.vals(), 0, Principal.equal, Principal.hash);
        registeredApps := HashMap.fromIter<Principal, ThirdPartyApp>(appEntries.vals(), 0, Principal.equal, Principal.hash);
    };

    // User Management
    public shared(msg) func initializeUser() : async Result.Result<UserProfile, Text> {
        let caller = msg.caller;
        
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals not allowed");
        };

        switch (users.get(caller)) {
            case (?existing) {
                #err("User already initialized");
            };
            case null {
                let newProfile : UserProfile = {
                    documents = [];
                    authorizedApps = [];
                    lastUpdated = Time.now();
                };
                users.put(caller, newProfile);
                #ok(newProfile);
            };
        };
    };

    // Document Management
    public shared(msg) func submitDocument(
        docType: DocumentType,
        documentNumber: Text,
        imageHash: ?Text
    ) : async Result.Result<Document, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case null return #err("User not initialized");
            case (?userProfile) {
                let newDocument : Document = {
                    documentType = docType;
                    documentNumber = documentNumber;
                    imageHash = imageHash;
                    verificationStatus = #Pending;
                    submissionTime = Time.now();
                    verificationTime = null;
                    aiVerificationResult = null;
                };

                let updatedDocs = Array.append<Document>(
                    userProfile.documents,
                    [newDocument]
                );

                let updatedProfile : UserProfile = {
                    documents = updatedDocs;
                    authorizedApps = userProfile.authorizedApps;
                    lastUpdated = Time.now();
                };

                users.put(caller, updatedProfile);
                #ok(newDocument);
            };
        };
    };

    public shared(msg) func updateDocumentVerification(
        docType: DocumentType,
        aiResult: Text
    ) : async Result.Result<Document, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case null return #err("User not found");
            case (?userProfile) {
                // Create a document to search for
                let searchDoc : Document = {
                    documentType = docType;
                    documentNumber = "";  // These fields don't matter for comparison
                    imageHash = null;
                    verificationStatus = #Pending;
                    submissionTime = 0;
                    verificationTime = null;
                    aiVerificationResult = null;
                };

                let documentIndex = Array.indexOf<Document>(
                    searchDoc,
                    userProfile.documents,
                    func(a: Document, b: Document) : Bool {
                        a.documentType == b.documentType
                    }
                );

                switch (documentIndex) {
                    case null #err("Document not found");
                    case (?index) {
                        let updatedDoc : Document = {
                            documentType = docType;
                            documentNumber = userProfile.documents[index].documentNumber;
                            imageHash = userProfile.documents[index].imageHash;
                            verificationStatus = #Verified;
                            submissionTime = userProfile.documents[index].submissionTime;
                            verificationTime = ?Time.now();
                            aiVerificationResult = ?aiResult;
                        };

                        let updatedDocs = Array.tabulate<Document>(
                            userProfile.documents.size(),
                            func(i: Nat) : Document {
                                if (i == index) { updatedDoc } 
                                else { userProfile.documents[i] }
                            }
                        );

                        let updatedProfile : UserProfile = {
                            documents = updatedDocs;
                            authorizedApps = userProfile.authorizedApps;
                            lastUpdated = Time.now();
                        };

                        users.put(caller, updatedProfile);
                        #ok(updatedDoc);
                    };
                };
            };
        };
    };

    // App Registration and Authorization
    public shared(msg) func registerApp(
        name: Text,
        description: Text,
        redirectUri: Text,
        allowedScopes: [DocumentType]
    ) : async Result.Result<ThirdPartyApp, Text> {
        let appId = msg.caller;
        
        switch (registeredApps.get(appId)) {
            case (?_) #err("App already registered");
            case null {
                let clientSecret = generateSecret(appId, Time.now());
                let app : ThirdPartyApp = {
                    name = name;
                    description = description;
                    redirectUri = redirectUri;
                    clientSecret = clientSecret;
                    allowedScopes = allowedScopes;
                    registrationTime = Time.now();
                };
                registeredApps.put(appId, app);
                #ok(app);
            };
        };
    };

    public shared(msg) func authorizeApp(
        appId: Principal,
        scopes: [DocumentType]
    ) : async Result.Result<AppAuthorization, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case null return #err("User not initialized");
            case (?userProfile) {
                switch (registeredApps.get(appId)) {
                    case null return #err("App not registered");
                    case (?app) {
                        let authorization : AppAuthorization = {
                            appId = appId;
                            name = app.name;
                            scopes = scopes;
                            authorized = true;
                            authorizationTime = Time.now();
                        };

                        let updatedAuths = Array.append<AppAuthorization>(
                            userProfile.authorizedApps,
                            [authorization]
                        );

                        let updatedProfile : UserProfile = {
                            documents = userProfile.documents;
                            authorizedApps = updatedAuths;
                            lastUpdated = Time.now();
                        };

                        users.put(caller, updatedProfile);
                        #ok(authorization);
                    };
                };
            };
        };
    };

    // Query Methods
    public query func getUserProfile(user: Principal) : async Result.Result<UserProfile, Text> {
        switch (users.get(user)) {
            case null #err("User not found");
            case (?profile) #ok(profile);
        };
    };

    public query func getAppDetails(appId: Principal) : async Result.Result<ThirdPartyApp, Text> {
        switch (registeredApps.get(appId)) {
            case null #err("App not found");
            case (?app) #ok(app);
        };
    };

    public query func getAuthorizedDocuments(
        user: Principal,
        appId: Principal
    ) : async Result.Result<[Document], Text> {
        switch (users.get(user)) {
            case null #err("User not found");
            case (?profile) {
                let searchAuth = {
                    appId = appId;
                    name = "";
                    scopes = [];
                    authorized = true;
                    authorizationTime = 0;
                };

                let authorization = Array.indexOf<AppAuthorization>(
                    searchAuth,
                    profile.authorizedApps,
                    func(a: AppAuthorization, b: AppAuthorization) : Bool {
                        a.appId == b.appId and a.authorized
                    }
                );

                switch (authorization) {
                    case null #err("App not authorized");
                    case (?index) {
                        let auth = profile.authorizedApps[index];
                        let authorizedDocs = Array.filter<Document>(
                            profile.documents,
                            func(doc: Document) : Bool {
                                Array.indexOf<DocumentType>(
                                    doc.documentType,
                                    auth.scopes,
                                    func(a: DocumentType, b: DocumentType) : Bool { a == b }
                                ) != null
                            }
                        );
                        #ok(authorizedDocs);
                    };
                };
            };
        };
    };

    // Helper Functions
private func generateSecret(principal: Principal, timestamp: Time.Time) : Text {
    // Simply combine principal and timestamp as text
    let principalText = Principal.toText(principal);
    let timeText = Int.toText(timestamp);
    principalText # "-" # timeText;
};
}
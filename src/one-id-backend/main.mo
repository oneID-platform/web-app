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
    // Types
    public type CredentialType = {
        #NIN;
        #BVN;
        #InternationalPassport;
        #NationalPassport;
        #DriversLicense;
        #FaceID;
        #VotersCard;
    };

    public type NFT = {
    owner: Principal;
    imageUrl: Text;
    name: Text;
    description: Text;
    credentials: [Credential];  // Associated verified credentials
    mintTime: Time.Time;
};

    public type VerificationStatus = {
        #Pending;
        #Verified;
        #Rejected;
    };

    public type Credential = {
        title: Text;
        imageUrl: Text;
        description: Text;
        credentialType: CredentialType;
        provided: Bool;
        info: [(Text, Text)];  // Using an array of tuples to represent key-value pairs
        verificationStatus: VerificationStatus;
        submissionTime: Time.Time;
        verificationTime: ?Time.Time;
        aiVerificationResult: ?Text;
    };

    public type UserProfile = {
        credentials: [Credential];
        authorizedApps: [AppAuthorization];
        passport: ?NFT;  // Optional NFT, null if not minted
        lastUpdated: Time.Time;
    };

    public type AppAuthorization = {
        appId: Text;
        name: Text;
        scopes: [CredentialType];
        authorized: Bool;
        authorizationTime: Time.Time;
    };

    public type ThirdPartyApp = {
        appId:Text;
        name: Text;
        description: Text;
        redirectUri: Text;
        clientSecret: Text;
        allowedScopes: [CredentialType];
        registrationTime: Time.Time;
    };

    // State variables
    private stable var userEntries : [(Principal, UserProfile)] = [];
    private stable var appEntries : [(Text, ThirdPartyApp)] = [];
    private stable var totalNFTs : Nat = 0;
    private var users = HashMap.HashMap<Principal, UserProfile>(0, Principal.equal, Principal.hash);
    private var registeredApps = HashMap.HashMap<Text, ThirdPartyApp>(0, Text.equal, Text.hash);

    // System upgrade functions
    system func preupgrade() {
        userEntries := Iter.toArray(users.entries());
        appEntries := Iter.toArray(registeredApps.entries());
    };

    system func postupgrade() {
        users := HashMap.fromIter<Principal, UserProfile>(userEntries.vals(), 0, Principal.equal, Principal.hash);
        registeredApps := HashMap.fromIter<Text, ThirdPartyApp>(appEntries.vals(), 0, Text.equal, Text.hash);
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
                    credentials = [];
                    authorizedApps = [];
                    passport = null;
                    lastUpdated = Time.now();
                };
                users.put(caller, newProfile);
                #ok(newProfile);
            };
        };
    };

    // Credential Management
    public shared(msg) func submitCredential(
        title: Text,
        imageUrl: Text,
        description: Text,
        credentialType: CredentialType,
        info: [(Text, Text)]
    ) : async Result.Result<Credential, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case null return #err("User not initialized");
            case (?userProfile) {
                let newCredential : Credential = {
                    title = title;
                    imageUrl = imageUrl;
                    description = description;
                    credentialType = credentialType;
                    provided = true;
                    info = info;
                    verificationStatus = #Pending;
                    submissionTime = Time.now();
                    verificationTime = null;
                    aiVerificationResult = null;
                };

                let updatedCreds = Array.append<Credential>(
                    userProfile.credentials,
                    [newCredential]
                );

                let updatedProfile : UserProfile = {
                    credentials = updatedCreds;
                    authorizedApps = userProfile.authorizedApps;
                    passport = userProfile.passport;
                    lastUpdated = Time.now();
                };

                users.put(caller, updatedProfile);
                #ok(newCredential);
            };
        };
    };

    public shared(msg) func updateCredentialVerification(
        credentialType: CredentialType,
        title: Text,
        aiResult: Text
    ) : async Result.Result<Credential, Text> {
        let caller = msg.caller;
    
    switch (users.get(caller)) {
        case null return #err("User not found");
        case (?userProfile) {
            // Create a credential to search for
            let searchCred : Credential = {
                title = title;
                imageUrl = "";
                description = "";
                credentialType = credentialType;
                provided = true;
                info = [];
                verificationStatus = #Pending;
                submissionTime = 0;
                verificationTime = null;
                aiVerificationResult = null;
            };

            let credentialIndex = Array.indexOf<Credential>(
                searchCred,                    // element to find
                userProfile.credentials,       // array to search in
                func(a: Credential, b: Credential) : Bool {
                    a.credentialType == b.credentialType and a.title == b.title
                }
            );

                switch (credentialIndex) {
                    case null #err("Credential not found");
                    case (?index) {
                        let updatedCred : Credential = {
                            title = userProfile.credentials[index].title;
                            imageUrl = userProfile.credentials[index].imageUrl;
                            description = userProfile.credentials[index].description;
                            credentialType = userProfile.credentials[index].credentialType;
                            provided = userProfile.credentials[index].provided;
                            info = userProfile.credentials[index].info;
                            verificationStatus = #Verified;
                            submissionTime = userProfile.credentials[index].submissionTime;
                            verificationTime = ?Time.now();
                            aiVerificationResult = ?aiResult;
                        };

                        let updatedCreds = Array.tabulate<Credential>(
                            userProfile.credentials.size(),
                            func(i: Nat) : Credential {
                                if (i == index) { updatedCred } 
                                else { userProfile.credentials[i] }
                            }
                        );

                        let updatedProfile : UserProfile = {
                            credentials = updatedCreds;
                            authorizedApps = userProfile.authorizedApps;
                            passport = userProfile.passport;
                            lastUpdated = Time.now();
                        };

                        users.put(caller, updatedProfile);
                        #ok(updatedCred);
                    };
                };
            };
        };
    };

    // Add this function to mint NFT
public shared(msg) func mintDigitalPassport(
    name: Text,
    description: Text,
    imageUrl: Text,
) : async Result.Result<NFT, Text> {
    let caller = msg.caller;
    
    switch (users.get(caller)) {
        case null return #err("User not initialized");
        case (?userProfile) {
            // Check if user already has an NFT
            switch (userProfile.passport) {
                case (?existing) return #err("User already has a digital passport NFT");
                case null {
                    // Get verified credentials only
                    let verifiedCreds = Array.filter<Credential>(
                        userProfile.credentials,
                        func(cred: Credential) : Bool {
                            cred.verificationStatus == #Verified
                        }
                    );

                    if (Array.size(verifiedCreds) == 0) {
                        return #err("No verified credentials available to create digital passport");
                    };

                    let passport : NFT = {
                        owner = caller;
                        imageUrl = imageUrl;
                        name = name;
                        description = description;
                        credentials = verifiedCreds;
                        mintTime = Time.now();
                    };

                    let updatedProfile : UserProfile = {
                        credentials = userProfile.credentials;
                        authorizedApps = userProfile.authorizedApps;
                        lastUpdated = Time.now();
                        passport = ?passport;
                    };

                    users.put(caller, updatedProfile);
                    totalNFTs += 1;
                    #ok(passport)
                };
            };
        };
    };
};

// Add function to get user's NFT
public query func getUserNFT(user: Principal) : async Result.Result<NFT, Text> {
    switch (users.get(user)) {
        case null #err("User not found");
        case (?profile) {
            switch (profile.passport) {
                case null #err("User has not minted a digital passport");
                case (?nft) #ok(nft);
            };
        };
    };
};


    // App Registration and Authorization
    public shared(msg) func registerApp(
      appId: Text,
        name: Text,
        description: Text,
        redirectUri: Text,
        allowedScopes: [CredentialType]
    ) : async Result.Result<ThirdPartyApp, Text> {
        
        switch (registeredApps.get(appId)) {
            case (?_) #err("App already registered");
            case null {
                let clientSecret = generateSecretText(appId, Time.now());
                let app : ThirdPartyApp = {
                  appId = appId;
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
        appId: Text,
        scopes: [CredentialType]
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
                            credentials = userProfile.credentials;
                            authorizedApps = updatedAuths;
                            passport = userProfile.passport;
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

    public query func getAppDetails(appId: Text) : async Result.Result<ThirdPartyApp, Text> {
        switch (registeredApps.get(appId)) {
            case null #err("App not found");
            case (?app) #ok(app);
        };
    };

    public query func getAuthorizedCredentials(
        user: Principal,
        appId: Text
    ) : async Result.Result<[Credential], Text> {
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
                        let authorizedCreds = Array.filter<Credential>(
                            profile.credentials,
                            func(cred: Credential) : Bool {
                                Array.indexOf<CredentialType>(
                                    cred.credentialType,
                                    auth.scopes,
                                    func(a: CredentialType, b: CredentialType) : Bool { a == b }
                                ) != null
                            }
                        );
                        #ok(authorizedCreds);
                    };
                };
            };
        };
    };

    // Helper Functions
    private func generateSecret(principal: Principal , timestamp: Time.Time) : Text {
        let principalText = Principal.toText(principal);
        let timeText = Int.toText(timestamp);
        principalText # "-" # timeText;
    };
    private func generateSecretText(principal:Text , timestamp: Time.Time) : Text {
        let timeText = Int.toText(timestamp);
        principal # "-" # timeText;
    };

    // Add this to your OneIDPlatform actor in main.mo
    public query func lookup(id: Text) : async Result.Result<Credential, Text> {
        switch (users.get(Principal.fromText(id))) {
            case null #err("User not found");
            case (?profile) {
                switch (Array.find<Credential>(profile.credentials, func(c) = c.title == id)) {
                    case null #err("Credential not found");
                    case (?credential) #ok(credential);
                };
            };
        };
    };
}
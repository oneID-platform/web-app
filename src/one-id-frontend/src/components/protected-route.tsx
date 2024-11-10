import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "@/services/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const authService = AuthService.getInstance();

  useEffect(() => {
    const checkAuth = async () => {
      await authService.init();
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

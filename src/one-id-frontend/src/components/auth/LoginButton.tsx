import { useAuthStore } from "@/hooks/useAuth";

export const LoginButton = () => {
  const { login, isLoading, error } = useAuthStore();

  return (
    <button
      onClick={login}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
    >
      {isLoading ? "Connecting..." : "Login with Internet Identity"}
    </button>
  );
};

import { useAuthStore } from "@/hooks/useAuth";
import { useEffect } from "react";

function Header() {
  const { isAuthenticated, isLoading, login, logout, checkAuth } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      await logout();
    } else {
      await login();
    }
  };

  return (
    <header className="py-3 px-5 fixed left-1/2 -translate-x-1/2 top-10 w-[50%] flex justify-between items-center z-30 backdrop-blur-xl bg-[#37383baf] shadow-xl rounded-[.8rem]">
      <div className="flex items-center gap-2">
        <img
          src="/logo.svg"
          alt=""
          className="w-6 invert brightness-150"
          width={1}
          height={1}
        />
        <p className="text-gray-100 font-grotesk text-[1.2rem] font-bold">
          OneID
        </p>
      </div>
      <div className="flex justify-center items-center gap-6 text-sm text-gray-300">
        <a className="px-3" href="">
          Home
        </a>
        <a className="px-3" href="">
          Features
        </a>
        <a className="px-3" href="">
          About
        </a>
        <a className="px-3" href="">
          Contact
        </a>
      </div>
      <button
        onClick={handleAuthAction}
        disabled={isLoading}
        className="text-sm bg-[#cae88b] px-6 py-[.6rem] text-gray-900 font-semibold rounded-[.7rem] disabled:opacity-50"
      >
        {isLoading
          ? "Loading..."
          : isAuthenticated
          ? "Sign Out"
          : "Get Started"}
      </button>
    </header>
  );
}

export default Header;

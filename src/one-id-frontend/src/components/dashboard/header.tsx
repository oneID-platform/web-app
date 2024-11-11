import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/hooks/useAuth";

function Header() {
  const [_, setPrincipalId] = useState<string>("");
  const { logout, getIdentity } = useAuthStore();

  useEffect(() => {
    const identity = getIdentity();
    const principal = identity?.getPrincipal();
    console.log(principal?.toString());
    if (identity) {
      setPrincipalId(identity.getPrincipal().toString());
    }
  }, [getIdentity]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex items-center justify-between pt-8 gap-6 w-[80%] mx-auto">
      <div className="flex gap-3 items-center">
        <img
          src="/logo.svg"
          alt=""
          width={1}
          height={1}
          className="w-10 h-10 rounded-full invert"
        />
        <p className="font-grotesk text-[1.6rem] font-bold">OneID</p>
      </div>
      <div className="flex items-center gap-8 text-gray-400 text-sm absolute left-1/2 -translate-x-1/2">
        <NavLink to="/dashboard">Profile</NavLink>
        <NavLink to="/dashboard/integrations">Integrations</NavLink>
        <a>About</a>
        <a>Settings</a>
      </div>
      <button
        onClick={handleLogout}
        className="ml-auto bg-[#cae88b] text-gray-950 text-sm px-8 py-3 rounded-lg"
      >
        Sign Out
      </button>
      <img
        src="/icons/avatar.svg"
        alt=""
        width={10}
        height={10}
        className="w-10 h-10 rounded-full"
      />
    </header>
  );
}

export default Header;

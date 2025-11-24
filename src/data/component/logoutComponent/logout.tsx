import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const LogoutPage: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    localStorage.removeItem("authToken");
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="p-3 bg-slate-800 rounded-lg">
            <LogOut size={25} className="text-slate-400" />
          </div>
        </div>

        <h1 className="md:text-2xl text-xl font-bold text-white mb-2">
          Confirm Logout
        </h1>
        <p className="text-slate-400 mb-8 text-md md:text-lg">
          Are you sure you want to logout? You'll need to sign in again to
          access your dashboard.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 px-4 py-2.5 bg-slate-400 hover:bg-blue-400 disabled:bg-slate-700 text-white font-medium rounded-lg transition-colors"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;

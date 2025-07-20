import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-10 py-4 bg-black shadow-sm gap-y-4">
      <h1
        className="text-2xl font-bold cursor-pointer mb-2 md:mb-0"
        onClick={() => router.push("/")}
      >
        Resume Builder
      </h1>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center w-full md:w-auto">
        {token && (
          <Button
            variant="secondary"
            className="bg-white text-black cursor-pointer w-full md:w-auto"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Button>
        )}
        <Button
          variant="secondary"
          className="bg-white text-black cursor-pointer w-full md:w-auto"
          onClick={
            token
              ? () => {
                  localStorage.removeItem("token");
                  setToken(null);
                  router.push("/login");
                }
              : () => router.push("/login")
          }
        >
          {token ? "Logout" : "Login"}
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;

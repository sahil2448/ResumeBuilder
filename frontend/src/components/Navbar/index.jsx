import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  // Only run this code on the client-side
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <nav className="flex justify-between">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        {"Resume Builder"}
      </h1>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        {
          <Button
            variant="secondary"
            className="bg-white text-black cursor-pointer"
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
        }
      </div>
    </nav>
  );
}

export default Navbar;

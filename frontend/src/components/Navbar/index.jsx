import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex justify-between">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        ResumeBuilder
      </h1>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button
          variant="secondary"
          className={"bg-white text-black cursor-pointer"}
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;

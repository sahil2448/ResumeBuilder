import Navbar from "@/components/Navbar";
import React from "react";

function UserLayout({ children }) {
  return (
    <div className=" ">
      <Navbar />
      {children}
    </div>
  );
}

export default UserLayout;

import UserLayout from "@/layouts/UserLayout";
import React, { useState } from "react";
import Resumes from "./resumes";
import User from "./user";

function DashboardIndex() {
  const sideBarItems = ["Resumes", "User"];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <UserLayout>
      <div className="flex gap-10">
        <div className="w-[20%] py-5 flex flex-col gap-3">
          {sideBarItems.map((item, idx) => (
            <div
              className={`cursor-pointer px-5 py-3 ${
                activeIdx === idx ? "bg-neutral-900" : ""
              }`}
              onClick={() => setActiveIdx(idx)}
              key={idx}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="w-[80%]">
          {activeIdx === 0 && <Resumes />}
          {activeIdx === 1 && <User />}
        </div>
      </div>
    </UserLayout>
  );
}

export default DashboardIndex;

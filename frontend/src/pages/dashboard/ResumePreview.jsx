// components/ResumePreview.jsx
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ResumePreview = ({ profile }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${profile?.username}_Resume`,
  });

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-100  min-w-[20rem] max-h-fit">
      <div
        ref={componentRef}
        className="bg-white shadow-md max-w-3xl mx-auto p-8 max-h-fit  text-black"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-sm font-bold">{profile.userId.name}</h1>
          <p className="text-sm mt-2">
            {profile.userId.email || "your.email@example.com"}
          </p>
        </div>

        {/* Summary */}
        {profile.bio && (
          <section className="">
            <h2 className="text-sm font-semibold">Summary</h2>
            <p className="mt-1 text-[10px] text-gray-800">{profile.bio}</p>
          </section>
        )}

        {/* Skills */}
        {/* {profile.skills?.length > 0 && (
          <section className="">
            <h2 className="text-sm font-semibold">Skills</h2>
            <ul className="list-disc list-inside text-gray-800">
              {profile.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        )} */}

        {/* Education */}
        {profile.education?.length > 0 && (
          <section className="">
            <h2 className="text-sm font-semibold">Education</h2>
            {profile.education.map((edu, i) => (
              <div key={i} className="mt-2">
                <p className=" text-[10px]">{edu.degree}</p>
                <p className="text-[10px]">{edu.school}</p>
                <p className="text-[10px] text-gray-600">{edu.fieldOfStudy}</p>
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {profile.pastWork?.length > 0 && (
          <section className="">
            <h2 className="text-sm font-semibold">Experience</h2>
            {profile.pastWork.map((exp, i) => (
              <div key={i} className="">
                <p className="text-[10px]">
                  {exp.position} at {exp.company}
                </p>
                <p className="text-[10px] text-gray-600">{exp.Year}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Projects</h2>
            {profile.projects.map((proj, i) => (
              <div key={i} className="mt-2">
                <p className="font-bold">{proj.title}</p>
                <p className="text-gray-800">{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
      <div className="mt-10 text-right">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;

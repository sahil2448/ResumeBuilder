"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ResumePreview = ({ profile }) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${profile?.userId?.name || "Resume"}_Resume`,
  });

  if (!profile) {
    return (
      <div className="w-80 h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-80  shadow-lg rounded-lg overflow-hidden bg-white p-6 text-black min-h-96"
        ref={componentRef}
        style={{ fontFamily: "Georgia, serif" }}
      >
        {/* Header */}
        <div className="border-b-2 border-gray-300 pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {profile.userId.name}
          </h1>
          <p className="text-base text-gray-600 mt-1">
            {profile.userId.email || "your.email@example.com"}
          </p>
        </div>

        {/* Summary */}
        {profile.bio && (
          <section className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {profile.bio}
            </p>
          </section>
        )}

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <section className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <section className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Education
            </h2>
            {profile.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="text-sm ">Institute: {edu.school}</p>

                <div className="flex gap-1">
                  <p className="font-medium text-sm text-gray-900">
                    {edu.degree},
                  </p>
                  <p className="text-sm ">{edu.fieldOfStudy}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {profile.pastWork && profile.pastWork.length > 0 && (
          <section className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Experience
            </h2>
            {profile.pastWork.map((exp, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium text-sm text-gray-900">
                  {exp.position} at {exp.company}
                </p>
                <p className="text-sm ">Years : {exp.Year}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {profile.projects && profile.projects.length > 0 && (
          <section className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Projects
            </h2>
            {profile.projects.map((proj, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium text-sm text-gray-900">
                  {proj.title}
                </p>
                <p className="text-sm text-gray-700">{proj.description}</p>
              </div>
            ))}
          </section>
        )}
        {/* </div> */}
      </div>

      <button
        onClick={handlePrint}
        className="w-full max-w-80 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default ResumePreview;

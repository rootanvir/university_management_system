"use client";

import { useState } from "react";

export default function ManageCourses() {
  const [activeTab, setActiveTab] = useState("Courses");

  return (
    <main className="p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Manage Courses / Subjects
          </h1>
          <p className="mt-1 text-gray-500">
            Manage courses and subjects.
          </p>
        </div>

        <button className="cursor-pointer rounded-md border px-5 py-2 font-medium hover:bg-gray-100">
          Add {activeTab === "Courses" ? "Course" : "Subject"}
        </button>
      </div>

      <div className="mt-6 flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("Courses")}
          className={`cursor-pointer px-5 py-3 ${
            activeTab === "Courses"
              ? "border-b-2 font-semibold"
              : "text-gray-500"
          }`}
        >
          Courses
        </button>

        <button
          onClick={() => setActiveTab("Subjects")}
          className={`cursor-pointer px-5 py-3 ${
            activeTab === "Subjects"
              ? "border-b-2 font-semibold"
              : "text-gray-500"
          }`}
        >
          Subjects
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        {activeTab === "Courses" ? (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Course ID</th>
                <th className="p-4 text-left">Course Name</th>
                <th className="p-4 text-left">Subjects</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-4">CRS-001</td>
                <td className="p-4">Web Development</td>
                <td className="p-4">4</td>
                <td className="p-4">
                  <button className="rounded-md border px-3 py-1">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Subject ID</th>
                <th className="p-4 text-left">Subject Name</th>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-4">SUB-001</td>
                <td className="p-4">Frontend Development</td>
                <td className="p-4">Web Development</td>
                <td className="p-4">
                  <button className="rounded-md border px-3 py-1">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
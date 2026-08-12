"use client";

import { useEffect, useState } from "react";
import AddCourse from "../lib/AddCourse";
import EditCourse from "../lib/EditCourse";

type Course = {
  course_id: number;
  course_name: string;
  course_credit: number;
};

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);


  const getCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:5039/api/Courses"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.course_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5039/api/Courses/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result);
      }

      await getCourses();

    } catch (error) {
      console.error("Delete course error:", error);
    }
  };

  return (
    <main className="p-10">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage Courses
          </h1>

          <p className="mt-1 text-gray-500">
            Manage courses.
          </p>
        </div>

        <button
          onClick={() => setShowAddCourse(true)}
          className="cursor-pointer rounded-md border px-5 py-2 font-medium text-gray-900 hover:bg-gray-100"
        >
          Add Course
        </button>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border px-4 py-2 text-gray-900 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">

        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left text-gray-900">
                Course ID
              </th>

              <th className="p-4 text-left text-gray-900">
                Course Name
              </th>

              <th className="p-4 text-left text-gray-900">
                Credit
              </th>

              <th className="p-4 text-left text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  Loading courses...
                </td>
              </tr>
            ) : filteredCourses.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No courses found.
                </td>
              </tr>
            ) : (
              filteredCourses.map((course) => (
                <tr
                  key={course.course_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 text-gray-900">
                    {course.course_id}
                  </td>

                  <td className="p-4 text-gray-900">
                    {course.course_name}
                  </td>

                  <td className="p-4 text-gray-900">
                    {course.course_credit}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => setEditingCourse(course)}
                        className="cursor-pointer rounded-md border px-3 py-1 text-gray-900 hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(course.course_id)}
                        className="cursor-pointer rounded-md border border-red-500 px-3 py-1 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>
      {showAddCourse && (
        <AddCourse
          onClose={() => setShowAddCourse(false)}
          onCourseAdded={getCourses}
        />
      )}
      {editingCourse && (
        <EditCourse
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onCourseUpdated={getCourses}
        />
      )}

    </main>
  );
}
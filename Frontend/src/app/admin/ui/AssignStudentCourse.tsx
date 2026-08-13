"use client";

import { useEffect, useState } from "react";

type Student = {
  user_id: number;
  user_name: string;
};

type Course = {
  course_id: number;
  course_name: string;
  course_credit: number;
};

type StudentCourse = {
  student_course_id: number;
  student_id: number;
  student: string;
  course_id: number;
  course: string;
  course_credit: number;
};

export default function AssignStudentCourse() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<StudentCourse[]>([]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [loading, setLoading] = useState(true);

  const getStudents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5039/api/Users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      const studentUsers = data.filter(
        (user: any) => user.user_role === "Student"
      );

      setStudents(studentUsers);
    } catch (error) {
      console.error(error);
    }
  };

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
      console.error(error);
    }
  };

  const getAssignments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5039/api/StudentCourses"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch assignments");
      }

      const data = await response.json();

      setAssignments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
    getCourses();
    getAssignments();
  }, []);

  const handleAssign = async () => {
    if (!selectedStudent || !selectedCourse) {
      alert("Please select a student and course.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5039/api/StudentCourses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: Number(selectedStudent),
            course_id: Number(selectedCourse),
          }),
        }
      );

      const result = await response.text();

      if (!response.ok) {
        alert(result);
        return;
      }

      alert("Student assigned successfully.");

      setSelectedStudent("");
      setSelectedCourse("");

      getAssignments();
    } catch (error) {
      console.error(error);
      alert("Failed to assign student.");
    }
  };

  const handleRemove = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this student from the course?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5039/api/StudentCourses/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.text();

      if (!response.ok) {
        alert(result);
        return;
      }

      getAssignments();
    } catch (error) {
      console.error(error);
      alert("Failed to remove student.");
    }
  };

  return (
    <main className="p-4">

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Assign Students
        </h1>

        <p className="mt-1 text-gray-500">
          Assign students to courses.
        </p>
      </div>

      <div className="mt-6 rounded-lg border p-6">

        <div className="grid grid-cols-2 gap-5">

          <div>
            <label className="text-sm font-medium text-gray-900">
              Student
            </label>

            <select
              value={selectedStudent}
              onChange={(e) =>
                setSelectedStudent(e.target.value)
              }
              className="mt-2 w-full rounded-md border p-2 text-gray-900"
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student.user_id}
                  value={student.user_id}
                >
                  {student.user_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900">
              Course
            </label>

            <select
              value={selectedCourse}
              onChange={(e) =>
                setSelectedCourse(e.target.value)
              }
              className="mt-2 w-full rounded-md border p-2 text-gray-900"
            >
              <option value="">
                Select Course
              </option>

              {courses.map((course) => (
                <option
                  key={course.course_id}
                  value={course.course_id}
                >
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="mt-5 flex justify-end">

          <button
            onClick={handleAssign}
            className="cursor-pointer rounded-md border px-5 py-2 font-medium text-gray-900 hover:bg-gray-100"
          >
            Assign Student
          </button>

        </div>

      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">

        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-50">

              <th className="p-4 text-left text-gray-900">
                Student
              </th>

              <th className="p-4 text-left text-gray-900">
                Course
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
                  Loading...
                </td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No student course assignments found.
                </td>
              </tr>
            ) : (
              assignments.map((assignment) => (
                <tr
                  key={assignment.student_course_id}
                  className="border-b"
                >

                  <td className="p-4 text-gray-900">
                    {assignment.student}
                  </td>

                  <td className="p-4 text-gray-900">
                    {assignment.course}
                  </td>

                  <td className="p-4 text-gray-900">
                    {assignment.course_credit}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleRemove(
                          assignment.student_course_id
                        )
                      }
                      className="cursor-pointer rounded-md border border-red-500 px-3 py-1 text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}
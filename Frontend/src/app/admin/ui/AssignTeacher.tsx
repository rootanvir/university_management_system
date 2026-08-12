"use client";

import { useEffect, useState } from "react";

type Teacher = {
    user_id: number;
    user_name: string;
    user_role: string;
};

type Course = {
    course_id: number;
    course_name: string;
    course_credit: number;
};

type Assignment = {
    teacher_course_id: number;
    teacher_id: number;
    teacher: string;
    course_id: number;
    course: string;
};

export default function AssignTeacher() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    const [loading, setLoading] = useState(true);

    const getTeachers = async () => {
        try {
            const response = await fetch(
                "http://localhost:5039/api/Users"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch teachers");
            }

            const data = await response.json();

            const teacherUsers = data.filter(
                (user: Teacher) => user.user_role === "Teacher"
            );

            setTeachers(teacherUsers);
        } catch (error) {
            console.error("Teacher error:", error);
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
            console.error("Course error:", error);
        }
    };

    const getAssignments = async () => {
        try {
            const response = await fetch(
                "http://localhost:5039/api/TeacherCourses"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch assignments");
            }

            const data = await response.json();

            console.log("Assignments:", data);

            setAssignments(data);
        } catch (error) {
            console.error("Assignment error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTeachers();
        getCourses();
        getAssignments();
    }, []);

    const handleAssign = async () => {
        if (!selectedTeacher || !selectedCourse) {
            alert("Please select a teacher and course.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5039/api/TeacherCourses",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        teacher_id: Number(selectedTeacher),
                        course_id: Number(selectedCourse),
                    }),
                }
            );

            const result = await response.text();

            if (!response.ok) {
                alert(result);
                return;
            }

            alert("Teacher assigned successfully.");

            setSelectedTeacher("");
            setSelectedCourse("");

            await getAssignments();

        } catch (error) {
            console.error("Assign error:", error);
            alert("Failed to assign teacher.");
        }
    };

    const handleRemove = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this assignment?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5039/api/TeacherCourses/${id}`,
                {
                    method: "DELETE",
                }
            );

            const result = await response.text();

            if (!response.ok) {
                alert(result);
                return;
            }

            await getAssignments();

        } catch (error) {
            console.error("Remove error:", error);
            alert("Failed to remove assignment.");
        }
    };

    return (
        <main className="p-10">

            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Assign Teachers
                </h1>

                <p className="mt-1 text-gray-500">
                    Assign teachers to courses.
                </p>
            </div>

            <div className="mt-6 rounded-lg border p-6">

                <div className="grid grid-cols-2 gap-5">

                    <div>
                        <label className="text-sm font-medium text-gray-900">
                            Teacher
                        </label>

                        <select
                            value={selectedTeacher}
                            onChange={(e) =>
                                setSelectedTeacher(e.target.value)
                            }
                            className="mt-2 w-full rounded-md border p-2 text-gray-900"
                        >
                            <option value="">
                                Select Teacher
                            </option>

                            {teachers.map((teacher) => (
                                <option
                                    key={teacher.user_id}
                                    value={teacher.user_id}
                                >
                                    {teacher.user_name}
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
                        Assign Teacher
                    </button>

                </div>

            </div>

            <div className="mt-6 overflow-x-auto rounded-lg border">

                <table className="w-full">

                    <thead>
                        <tr className="border-b bg-gray-50">

                            <th className="p-4 text-left text-gray-900">
                                Teacher
                            </th>

                            <th className="p-4 text-left text-gray-900">
                                Course
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
                                    colSpan={3}
                                    className="p-6 text-center text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : assignments.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="p-6 text-center text-gray-500"
                                >
                                    No teacher assignments found.
                                </td>
                            </tr>
                        ) : (
                            assignments.map((assignment) => (
                                <tr
                                    key={assignment.teacher_course_id}
                                    className="border-b"
                                >

                                    <td className="p-4 text-gray-900">
                                        {assignment.teacher}
                                    </td>

                                    <td className="p-4 text-gray-900">
                                        {assignment.course}
                                    </td>

                                    <td className="p-4">

                                        <button
                                            onClick={() =>
                                                handleRemove(
                                                    assignment.teacher_course_id
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
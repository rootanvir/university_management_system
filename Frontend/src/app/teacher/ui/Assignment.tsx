"use client";

import { useEffect, useState } from "react";

type Course = {
    course_id: number;
    course_name: string;
    course_credit: number;
};

type Assignment = {
    assignment_id: number;
    assignment_title: string;
    assignment_description: string;
    assignment_deadline: string;
    course_id: number;
    course_name: string;
    teacher_id: number;
    teacher_name: string;
};

export default function Assignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    const [showAdd, setShowAdd] = useState(false);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [courseId, setCourseId] = useState("");

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const teacherId = user.user_id;

    const getAssignments = async () => {
        try {
            const response = await fetch(
                "http://localhost:5039/api/Assignments"
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

    useEffect(() => {
        getAssignments();
        getCourses();
    }, []);

    const handleCreateAssignment = async () => {
        if (!title || !description || !deadline || !courseId) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const tokenCookie = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="));

            const token = tokenCookie?.split("=")[1];

            if (!token) {
                alert("You are not logged in.");
                return;
            }

            const response = await fetch(
                "http://localhost:5039/api/Assignments",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        assignment_title: title,
                        assignment_description: description,
                        assignment_deadline: deadline,
                        course_id: Number(courseId),
                        teacher_id: teacherId,
                    }),
                }
            );

            const result = await response.text();

            if (!response.ok) {
                alert(result);
                return;
            }

            alert("Assignment created successfully.");

            setTitle("");
            setDescription("");
            setDeadline("");
            setCourseId("");
            setShowAdd(false);

            getAssignments();
        } catch (error) {
            console.error(error);
            alert("Failed to create assignment.");
        }
    };

    const handleDeleteAssignment = async (assignmentId: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this assignment?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const tokenCookie = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="));

            const token = tokenCookie?.split("=")[1];

            if (!token) {
                alert("You are not logged in.");
                return;
            }

            const response = await fetch(
                `http://localhost:5039/api/Assignments/${assignmentId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.text();

            if (!response.ok) {
                alert(result);
                return;
            }

            alert("Assignment deleted successfully.");

            getAssignments();
        } catch (error) {
            console.error(error);
            alert("Failed to delete assignment.");
        }
    };

    return (
        <main className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Assignments
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Create and manage assignments for your students.
                    </p>
                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    className="cursor-pointer rounded-md border px-5 py-2 font-medium text-gray-900 hover:bg-gray-100"
                >
                    Add Assignment
                </button>
            </div>

            <div className="mt-6 overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="p-4 text-left text-gray-900">
                                Assignment
                            </th>

                            <th className="p-4 text-left text-gray-900">
                                Course
                            </th>

                            <th className="p-4 text-left text-gray-900">
                                Deadline
                            </th>

                            <th className="p-4 text-left text-gray-900">
                                Teacher
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
                                    colSpan={5}
                                    className="p-6 text-center text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : assignments.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="p-6 text-center text-gray-500"
                                >
                                    No assignments found.
                                </td>
                            </tr>
                        ) : (
                            assignments.map((assignment) => (
                                <tr
                                    key={assignment.assignment_id}
                                    className="border-b"
                                >
                                    <td className="p-4 text-gray-900">
                                        {assignment.assignment_title}
                                    </td>

                                    <td className="p-4 text-gray-900">
                                        {assignment.course_name}
                                    </td>

                                    <td className="p-4 text-gray-900">
                                        {new Date(
                                            assignment.assignment_deadline
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-4 text-gray-900">
                                        {assignment.teacher_name}
                                    </td>

                                    <td className="p-4">
                                        <button
                                            onClick={() =>
                                                handleDeleteAssignment(
                                                    assignment.assignment_id
                                                )
                                            }
                                            className="cursor-pointer rounded-md border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showAdd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Add Assignment
                            </h2>

                            <button
                                onClick={() => setShowAdd(false)}
                                className="cursor-pointer text-xl text-gray-500 hover:text-gray-900"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-6">
                            <label className="text-sm font-medium text-gray-900">
                                Assignment Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-2 w-full rounded-md border p-2 text-gray-900"
                                placeholder="Enter assignment title"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="text-sm font-medium text-gray-900">
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                className="mt-2 w-full rounded-md border p-2 text-gray-900"
                                rows={4}
                                placeholder="Enter assignment description"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="text-sm font-medium text-gray-900">
                                Course
                            </label>

                            <select
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                                className="mt-2 w-full rounded-md border p-2 text-gray-900"
                            >
                                <option value="">Select Course</option>

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

                        <div className="mt-4">
                            <label className="text-sm font-medium text-gray-900">
                                Deadline
                            </label>

                            <input
                                type="datetime-local"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="mt-2 w-full rounded-md border p-2 text-gray-900"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowAdd(false)}
                                className="cursor-pointer rounded-md border px-5 py-2 text-gray-900 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleCreateAssignment}
                                className="cursor-pointer rounded-md bg-gray-900 px-5 py-2 text-white hover:bg-gray-700"
                            >
                                Create Assignment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
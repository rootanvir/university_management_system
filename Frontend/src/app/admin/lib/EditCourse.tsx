"use client";

import { useState } from "react";

type Course = {
    course_id: number;
    course_name: string;
    course_credit: number;
};

type EditCourseProps = {
    course: Course;
    onClose: () => void;
    onCourseUpdated: () => void;
};

export default function EditCourse({
    course,
    onClose,
    onCourseUpdated,
}: EditCourseProps) {
    const [name, setName] = useState(course.course_name);
    const [credit, setCredit] = useState(
        course.course_credit.toString()
    );

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `http://localhost:5039/api/Courses/${course.course_id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        course_name: name,
                        course_credit: Number(credit),
                    }),
                }
            );

            const result = await response.text();

            if (!response.ok) {
                throw new Error(result);
            }

            onCourseUpdated();
            onClose();

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-semibold text-gray-900">
                        Edit Course
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-gray-500 hover:text-gray-900"
                    >
                        ×
                    </button>

                </div>

                {error && (
                    <div className="mt-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-5 space-y-4"
                >

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Course Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-md border px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Credit
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={credit}
                            onChange={(e) => setCredit(e.target.value)}
                            required
                            className="w-full rounded-md border px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading
                                ? "Updating..."
                                : "Update Course"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
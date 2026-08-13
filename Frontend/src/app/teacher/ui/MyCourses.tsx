"use client";

import { useEffect, useState } from "react";

type Course = {
    course_id: number;
    course_name: string;
    course_credit: number;
    teacher_id: number;
    teacher_name: string;
};

export default function MyCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMyCourses = async () => {
            try {
                const user = JSON.parse(
                    localStorage.getItem("user") || "{}"
                );

                const teacherId = user.user_id;

                if (!teacherId) {
                    return;
                }

                const response = await fetch(
                    `http://localhost:5039/api/TeacherCourses/teacher/${teacherId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch my courses");
                }

                const data: Course[] = await response.json();

                setCourses(data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getMyCourses();
    }, []);

    return (
        <main className="p-4">

            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    My Courses
                </h1>

                <p className="mt-1 text-gray-500">
                    View the courses assigned to you.
                </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {loading ? (
                    <p className="text-gray-500">
                        Loading courses...
                    </p>
                ) : courses.length === 0 ? (
                    <p className="text-gray-500">
                        No courses assigned to you.
                    </p>
                ) : (
                    courses.map((course) => (
                        <div
                            key={course.course_id}
                            className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <h2 className="text-xl font-semibold text-gray-900">
                                {course.course_name}
                            </h2>

                            <div className="mt-4 flex justify-between text-sm text-gray-600">
                                <span>
                                    Credit: {course.course_credit}
                                </span>

                                <span>
                                    Teacher: {course.teacher_name}
                                </span>
                            </div>

                        </div>
                    ))
                )}

            </div>

        </main>
    );
}
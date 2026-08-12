"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MyCourses from "./ui/MyCourses";
import Assignments from "./ui/Assignment";
import Submissions from "./ui/Submission";

export default function Teacher() {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState("courses");
  const getTeacherId = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    const userData = JSON.parse(user);

    return userData.user_id;
  };

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
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
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5039/api/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "courses":
        return <MyCourses />;

      case "assignments":
        return <Assignments />;

      case "submissions":
        return <Submissions />;

      default:
        return <MyCourses />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-600">

      <nav className="bg-white text-gray-600 shadow">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-bold">
            Teacher Portal
          </h1>

          <div className="flex items-center gap-2">

            <button
              onClick={() => setActiveMenu("courses")}
              className={`cursor-pointer rounded-lg px-4 py-2 ${activeMenu === "courses"
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
                }`}
            >
              My Courses
            </button>

            <button
              onClick={() => setActiveMenu("assignments")}
              className={`cursor-pointer rounded-lg px-4 py-2 ${activeMenu === "assignments"
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
                }`}
            >
              Assignments
            </button>

            <button
              onClick={() => setActiveMenu("submissions")}
              className={`cursor-pointer rounded-lg px-4 py-2 ${activeMenu === "submissions"
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
                }`}
            >
              Submissions
            </button>

            <button
              onClick={handleLogout}
              className="ml-3 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      <div className="mx-auto max-w-7xl p-8">

        <div className="rounded-xl bg-white p-6 text-gray-600 shadow">
          {renderContent()}
        </div>

      </div>

    </main>
  );
}
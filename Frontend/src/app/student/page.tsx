"use client";

import { useRouter } from "next/navigation";

export default function Student() {
  const router = useRouter();

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

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">

        <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome to Student Portal
            </h1>

            <p className="mt-2 text-gray-600">
              This is your student dashboard.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="font-semibold">Profile</h2>
            <p className="mt-2 text-gray-500">
              View your profile
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="font-semibold">Courses</h2>
            <p className="mt-2 text-gray-500">
              View your courses
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="font-semibold">Results</h2>
            <p className="mt-2 text-gray-500">
              View your results
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}


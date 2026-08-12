"use client";

export default function MyCourses() {
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

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <h2 className="text-xl font-semibold text-gray-900">
            Web Development
          </h2>

          <p className="mt-2 text-gray-500">
            Learn frontend and backend web development.
          </p>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Credit: 3</span>
            <span>Students: 35</span>
          </div>

          <button className="mt-5 cursor-pointer rounded-md border px-4 py-2 text-gray-900 hover:bg-gray-100">
            View Course
          </button>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <h2 className="text-xl font-semibold text-gray-900">
            Database Management
          </h2>

          <p className="mt-2 text-gray-500">
            Learn database design, SQL and database systems.
          </p>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Credit: 3</span>
            <span>Students: 28</span>
          </div>

          <button className="mt-5 cursor-pointer rounded-md border px-4 py-2 text-gray-900 hover:bg-gray-100">
            View Course
          </button>

        </div>

      </div>

    </main>
  );
}
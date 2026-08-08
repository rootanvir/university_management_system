"use client";

export default function AssignmentSubmission() {
  return (
    <main className="p-10">
      <div>
        <h1 className="text-2xl font-semibold">
          Assignment Submissions
        </h1>

        <p className="mt-1 text-gray-500">
          View assignments and their student submissions.
        </p>
      </div>

      <div className="mt-6 rounded-lg border p-6">
        <div className="flex items-start justify-between border-b pb-5">
          <div>
            <h2 className="text-xl font-semibold">
              Web Development Project
            </h2>

            <p className="mt-1 text-gray-500">
              Build a responsive web application using Next.js.
            </p>
          </div>

          <span className="rounded-md border px-3 py-1 text-sm">
            Published
          </span>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-5">
          <div>
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-medium">Web Development</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Subject</p>
            <p className="font-medium">Frontend Development</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Class</p>
            <p className="font-medium">CSE 101</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Mark</p>
            <p className="font-medium">100</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-lg font-semibold">
            Submissions
          </h3>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Student ID</th>
                  <th className="p-4 text-left">Student Name</th>
                  <th className="p-4 text-left">Submitted At</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-4">STU-001</td>
                  <td className="p-4">Tanvir Ahmed</td>
                  <td className="p-4">18 Aug 2026</td>
                  <td className="p-4">Submitted</td>
                  <td className="p-4">
                    <button className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-100">
                      View
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-4">STU-002</td>
                  <td className="p-4">John Smith</td>
                  <td className="p-4">19 Aug 2026</td>
                  <td className="p-4">Submitted</td>
                  <td className="p-4">
                    <button className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-100">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
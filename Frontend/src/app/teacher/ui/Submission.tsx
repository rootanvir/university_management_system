"use client";

export default function Submissions() {
  return (
    <main className="p-4">

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Submissions
        </h1>

        <p className="mt-1 text-gray-500">
          View and manage student assignment submissions.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">

        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-50">

              <th className="p-4 text-left text-gray-900">
                Student
              </th>

              <th className="p-4 text-left text-gray-900">
                Assignment
              </th>

              <th className="p-4 text-left text-gray-900">
                Course
              </th>

              <th className="p-4 text-left text-gray-900">
                Submitted
              </th>

              <th className="p-4 text-left text-gray-900">
                Status
              </th>

              <th className="p-4 text-left text-gray-900">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            <tr className="border-b">

              <td className="p-4 text-gray-900">
                Tanvir Ahmed
              </td>

              <td className="p-4 text-gray-900">
                Web Development Project
              </td>

              <td className="p-4 text-gray-900">
                Web Development
              </td>

              <td className="p-4 text-gray-900">
                18 Aug 2026
              </td>

              <td className="p-4 text-gray-900">
                Pending
              </td>

              <td className="p-4">

                <button className="cursor-pointer rounded-md border px-3 py-1 text-gray-900 hover:bg-gray-100">
                  View
                </button>

              </td>

            </tr>

            <tr className="border-b">

              <td className="p-4 text-gray-900">
                John Doe
              </td>

              <td className="p-4 text-gray-900">
                SQL Database Project
              </td>

              <td className="p-4 text-gray-900">
                Database Management
              </td>

              <td className="p-4 text-gray-900">
                19 Aug 2026
              </td>

              <td className="p-4 text-gray-900">
                Graded
              </td>

              <td className="p-4">

                <button className="cursor-pointer rounded-md border px-3 py-1 text-gray-900 hover:bg-gray-100">
                  View
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}
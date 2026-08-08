"use client";

export default function AssignTeacher() {
  return (
    <main className="p-10">
      <div>
        <h1 className="text-2xl font-semibold">
          Assign Teachers
        </h1>

        <p className="mt-1 text-gray-500">
          Assign teachers to courses and subjects.
        </p>
      </div>

      <div className="mt-6 rounded-lg border p-6">
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium">
              Teacher
            </label>

            <select className="mt-2 w-full rounded-md border p-2">
              <option>Select Teacher</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Course
            </label>

            <select className="mt-2 w-full rounded-md border p-2">
              <option>Select Course</option>
              <option>Web Development</option>
              <option>Database Management</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Subject
            </label>

            <select className="mt-2 w-full rounded-md border p-2">
              <option>Select Subject</option>
              <option>Frontend Development</option>
              <option>Backend Development</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button className="cursor-pointer rounded-md border px-5 py-2 font-medium hover:bg-gray-100">
            Assign Teacher
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Teacher</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-4">John Doe</td>
              <td className="p-4">Web Development</td>
              <td className="p-4">Frontend Development</td>
              <td className="p-4">
                <button className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-100">
                  Remove
                </button>
              </td>
            </tr>

            <tr>
              <td className="p-4">Jane Smith</td>
              <td className="p-4">Database Management</td>
              <td className="p-4">SQL</td>
              <td className="p-4">
                <button className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-100">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
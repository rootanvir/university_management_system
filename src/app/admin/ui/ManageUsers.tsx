"use client";

export default function ManageUsers() {
  return (
    <main className="p-10">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Manage Users
          </h1>

          <p className="mt-1 text-gray-500">
            Manage students and teachers.
          </p>
        </div>

        <button
          type="button"
          className="cursor-pointer rounded-md border px-5 py-2 font-medium hover:bg-gray-100"
        >
          Add User
        </button>
      </div>

       <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">User ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-4">USR-001</td>
              <td className="p-4">Tanvir Ahmed</td>
              <td className="p-4">tanvir@example.com</td>
              <td className="p-4">Student</td>
              <td className="p-4">Active</td>
              <td className="p-4">
                <button className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-100">
                  Edit
                </button>
              </td>
            </tr>

            <tr>
              <td className="p-4">USR-002</td>
              <td className="p-4">John Doe</td>
              <td className="p-4">john@example.com</td>
              <td className="p-4">Teacher</td>
              <td className="p-4">Active</td>
              <td className="p-4">
                <button className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-100">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
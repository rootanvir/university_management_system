"use client";

import { useEffect, useState } from "react";
import AddUser from "../lib/AddUser";
import EditUser from "../lib/EditUser";


type User = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_role: string;
};

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);


  const getUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5039/api/Users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5039/api/Users/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.text();

      console.log("Delete status:", response.status);
      console.log("Delete response:", result);

      if (!response.ok) {
        throw new Error(result || "Failed to delete user");
      }

      await getUsers();

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.user_name.toLowerCase().includes(searchText) ||
      user.user_email.toLowerCase().includes(searchText);

    const matchesRole =
      role === "All" || user.user_role === role;

    return matchesSearch && matchesRole;
  });

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
          onClick={() => {
            setEditingUser(null);
            setShowAddUser(true);
          }}
          className="cursor-pointer rounded-md border px-5 py-2 font-medium hover:bg-gray-100"
        >
          Add User
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border px-4 py-2 outline-none focus:border-blue-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-md border px-4 py-2 outline-none"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">User ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center"
                >
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.user_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    {user.user_id}
                  </td>

                  <td className="p-4">
                    {user.user_name}
                  </td>

                  <td className="p-4">
                    {user.user_email}
                  </td>

                  <td className="p-4">
                    {user.user_role}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowAddUser(false);
                          setEditingUser(user);
                        }}
                        className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.user_id)}
                        className="cursor-pointer rounded-md border border-red-500 px-3 py-1 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showAddUser && (
        <AddUser
          onClose={() => setShowAddUser(false)}
          onUserAdded={getUsers}
        />
      )}

      {editingUser && (
        <EditUser
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUserUpdated={getUsers}
        />
      )}
    </main>
  );
}
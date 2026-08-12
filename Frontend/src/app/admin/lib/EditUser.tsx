"use client";

import { useState } from "react";

type User = {
    user_id: number;
    user_name: string;
    user_email: string;
    user_role: string;
};

type EditUserProps = {
    user: User;
    onClose: () => void;
    onUserUpdated: () => void;
};

export default function EditUser({
    user,
    onClose,
    onUserUpdated,
}: EditUserProps) {
    const [name, setName] = useState(user.user_name);
    const [email, setEmail] = useState(user.user_email);
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(user.user_role);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `http://localhost:5039/api/Users/${user.user_id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_name: name,
                        user_email: email,
                        user_password: password,
                        user_role: role,
                    }),
                }
            );

            const result = await response.text();

            if (!response.ok) {
                throw new Error(result);
            }

            onUserUpdated();
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
                        Edit User
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
                            Name
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
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-md border px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Leave or Enter new password"
                            className="w-full rounded-md border px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-gray-900 outline-none"
                        >
                            <option value="Student">
                                Student
                            </option>

                            <option value="Teacher">
                                Teacher
                            </option>

                            <option value="Admin">
                                Admin
                            </option>
                        </select>
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
                            {loading ? "Updating..." : "Update User"}
                        </button>

                    </div>
                </form>

            </div>
        </div>
    );
}
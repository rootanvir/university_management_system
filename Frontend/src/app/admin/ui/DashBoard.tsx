"use client";

export default function Dashboard() {
    const stats = [
        {
            title: "Total Users",
            value: "1,250",
            description: "Registered users",
        },
        {
            title: "Total Courses",
            value: "48",
            description: "Active courses",
        },
        {
            title: "Teachers",
            value: "85",
            description: "Active teachers",
        },
        {
            title: "Students",
            value: "1,120",
            description: "Active students",
        },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900">
                Dashboard
            </h2>

            <p className="mt-1 text-gray-600">
                Overview of your application.
            </p>

            {/* Statistics Cards */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-xl border bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm font-medium text-gray-500">
                            {stat.title}
                        </p>

                        <h3 className="mt-2 text-3xl font-bold text-gray-900">
                            {stat.value}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            {stat.description}
                        </p>
                    </div>
                ))}

            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900">
                    Recent Activity
                </h3>

                <div className="mt-4 overflow-hidden rounded-xl border">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-5 py-3 text-gray-700">
                                    Activity
                                </th>
                                <th className="px-5 py-3 text-gray-700">
                                    User
                                </th>
                                <th className="px-5 py-3 text-gray-700">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-t">
                                <td className="px-5 py-4">
                                    New user registered
                                </td>
                                <td className="px-5 py-4">
                                    Tanvir Ahmed
                                </td>
                                <td className="px-5 py-4 text-gray-500">
                                    Today
                                </td>
                            </tr>

                            <tr className="border-t">
                                <td className="px-5 py-4">
                                    New course created
                                </td>
                                <td className="px-5 py-4">
                                    Admin
                                </td>
                                <td className="px-5 py-4 text-gray-500">
                                    Yesterday
                                </td>
                            </tr>

                            <tr className="border-t">
                                <td className="px-5 py-4">
                                    Assignment submitted
                                </td>
                                <td className="px-5 py-4">
                                    Student
                                </td>
                                <td className="px-5 py-4 text-gray-500">
                                    2 days ago
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
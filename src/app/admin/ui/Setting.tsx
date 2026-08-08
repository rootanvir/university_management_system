"use client";

export default function Setting() {
  return (
    <main className="p-10">
      <div>
        <h1 className="text-2xl font-semibold">
          Application Settings
        </h1>

        <p className="mt-1 text-gray-500">
          Manage application-level settings.
        </p>
      </div>

      <div className="mt-6 max-w-2xl rounded-lg border p-6">
        <div>
          <label className="text-sm font-medium">
            Application Name
          </label>

          <input
            type="text"
            defaultValue="Education Management System"
            className="mt-2 w-full rounded-md border p-2"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium">
            Default Maximum Mark
          </label>

          <input
            type="number"
            defaultValue="100"
            className="mt-2 w-full rounded-md border p-2"
          />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="font-medium">
              Allow User Registration
            </p>

            <p className="text-sm text-gray-500">
              Allow new users to register in the application.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
            className="h-5 w-5 cursor-pointer"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button className="cursor-pointer rounded-md border px-5 py-2 font-medium hover:bg-gray-100">
            Save Settings
          </button>
        </div>
      </div>
    </main>
  );
}
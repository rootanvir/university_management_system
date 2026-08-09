"use client";

export default function Student() {
  return (
    <div className="m-10 rounded-lg border p-6 shadow-sm">

      <div className="flex w-full justify-between rounded-md border p-5">
        <div className="font-semibold">Class Title</div>
        <div className="text-gray-600">Status - Pending</div>
      </div>


      <div className="mt-4 min-h-50 rounded-md border p-5">
        <h3 className="mb-2 font-semibold">Assignment Details</h3>
        <p className="text-gray-600">
          Assignment details will appear here.
        </p>
      </div>


      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="cursor-pointer rounded-md border px-6 py-2 font-medium transition hover:bg-gray-100"
        >
          Submit
        </button>
      </div>


      <div className="mt-4 rounded-md border p-5">
        <h3 className="mb-2 font-semibold">Feedback</h3>
        <p className="text-gray-600">
          No feedback yet.
        </p>
      </div>
    </div>
  );
}
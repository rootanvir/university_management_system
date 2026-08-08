"use client";

export default function AssignmentFeedback() {
  return (
    <div className="m-10 rounded-lg border p-6 shadow-sm">

      <div className="border-b pb-5">
        <h2 className="text-2xl font-semibold">
          Web Development Assignment
        </h2>

        <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Course</p>
            <p className="font-medium">Web Development</p>
          </div>

          <div>
            <p className="text-gray-500">Class</p>
            <p className="font-medium">CSE 101</p>
          </div>

          <div>
            <p className="text-gray-500">Total Mark</p>
            <p className="font-medium">100</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="mb-4 text-lg font-semibold">
          Student Submissions
        </h3>

        <div className="grid grid-cols-4 border">
          <div className="border p-3 font-semibold">
            Student ID
          </div>

          <div className="border p-3 font-semibold">
            Name
          </div>

          <div className="border p-3 font-semibold">
            Mark
          </div>

          <div className="border p-3 font-semibold">
            Feedback
          </div>

          <div className="border p-3">
            STU-001
          </div>

          <div className="border p-3">
            Tanvir Ahmed
          </div>

          <div className="border p-3">
            90
          </div>

          <div className="border p-3">
            Excellent work!
          </div>
        </div>
      </div>

    </div>
  );
}
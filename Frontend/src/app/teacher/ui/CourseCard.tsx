"use client"
import Image from "next/image";

export default function CourseCard() {
  return (
 <div className="m-10 rounded-lg border p-6">
      
      <div className="flex justify-between border-b pb-4">
        <div>
          <h2 className="text-xl font-semibold">Web Development</h2>
          <p className="text-sm text-gray-500">Introduction to Web Development</p>
        </div>

        <div className="text-sm">
          Status: 
        </div>
      </div>

      <div className="mt-5 space-y-4">
        
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            placeholder="Course title"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            placeholder="Course description"
            className="mt-1 w-full rounded-md border p-2"
            rows={4}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-medium">Class / Course</label>
            <input
              type="text"
              placeholder="Class or course"
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div className="w-32">
            <label className="font-medium">Mark</label>
            <input
              type="number"
              placeholder="100"
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
        </div>

      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="cursor-pointer rounded-md border px-5 py-2 hover:bg-gray-100"
        >
          Save as Draft
        </button>

        <button
          type="button"
          className="cursor-pointer rounded-md border px-5 py-2 font-medium hover:bg-gray-100"
        >
          Publish
        </button>
      </div>

    </div>
  );
}


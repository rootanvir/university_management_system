"use client";

import { useEffect, useState } from "react";


type Course = {
  student_course_id: number;
  student_id: number;
  course_id: number;
  course: string;
  teacher: string;
  course_credit: number;
};

export default function MyCourses() {


  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const getMyCourses = async () => {


      try {


        // get logged in user
        const user = JSON.parse(
          localStorage.getItem("user") || "{}"
        );


        const studentId = user.user_id;



        if (!studentId) {
          console.log("Student id not found");
          return;
        }



        const response = await fetch(
          `http://localhost:5039/api/StudentCourses/student/${studentId}`
        );



        if (!response.ok) {

          throw new Error(
            "Failed to fetch courses"
          );

        }



        const data = await response.json();



        setCourses(data);



      } catch (error) {


        console.error(
          error
        );


      } finally {


        setLoading(false);


      }


    };



    getMyCourses();


  }, []);



  return (

    <div>


      <h1 className="text-2xl font-semibold text-gray-900">
        My Courses
      </h1>


      <p className="mt-1 text-gray-500">
        View your enrolled courses.
      </p>



      <div className="mt-6 grid gap-5 md:grid-cols-3">


        {
          loading ? (

            <p>
              Loading courses...
            </p>


          ) : courses.length === 0 ? (


            <p className="text-gray-500">
              No courses assigned.
            </p>


          ) : (


            courses.map((course) => (


              <div
                key={course.student_course_id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >


                <h2 className="text-xl font-semibold text-gray-900">
                  {course.course}
                </h2>

                <p className="mt-2 text-gray-600">
                  Teacher: {course.teacher}
                </p>

                <p className="mt-2 text-gray-600">
                  Credit: {course.course_credit}
                </p>



              </div>


            ))


          )
        }


      </div>


    </div>

  );

}
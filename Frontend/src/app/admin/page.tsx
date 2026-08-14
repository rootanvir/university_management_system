"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ManageUsers from "./ui/ManageUsers";
import ManageCourses from "./ui/ManageCourses";
import AssignTeacher from "./ui/AssignTeacher";
import AssignmentSubmission from "./ui/AssignmentSubmission";
import Dashboard from "./ui/DashBoard";
import AssignStudentCourse from "./ui/AssignStudentCourse";


export default function Admin() {


  const router = useRouter();


  const [activeMenu, setActiveMenu] =
    useState("dashboard");





  const handleLogout = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );


    if (!confirmed) {
      return;
    }



    try {


      const tokenCookie =
        document.cookie
          .split("; ")
          .find((row) =>
            row.startsWith("token=")
          );


      const token =
        tokenCookie?.split("=")[1];



      if (!token) {

        router.push("/login");

        return;

      }





      const response =
        await fetch(
          "http://localhost:5039/api/auth/logout",
          {
            method: "POST",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );




      if (response.ok) {


        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


        router.push("/login");


      }


    }
    catch(error){

      console.error(
        "Logout error:",
        error
      );

    }


  };









  const renderContent = () => {


    switch(activeMenu){


      case "dashboard":

        return <Dashboard />;



      case "users":

        return <ManageUsers />;



      case "courses":

        return <ManageCourses />;




      case "teacher":

        return <AssignTeacher />;



      case "studentCourses":

        return <AssignStudentCourse />;




      case "submissions":

        return <AssignmentSubmission />;




      default:

        return <Dashboard />;


    }


  };









  return (

    <main className="min-h-screen bg-gray-100 text-gray-600">


      <nav className="bg-white text-gray-600 shadow">


        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">


          <h1 className="text-2xl font-bold">
            Admin Portal
          </h1>




          <div className="flex items-center gap-2">



            <button
              onClick={() =>
                setActiveMenu("dashboard")
              }
              className={`cursor-pointer rounded-lg px-4 py-2 ${
                activeMenu === "dashboard"
                ?
                "bg-gray-200"
                :
                "hover:bg-gray-100"
              }`}
            >
              Dashboard
            </button>





            <button
              onClick={() =>
                setActiveMenu("users")
              }
              className={`cursor-pointer rounded-lg px-4 py-2 ${
                activeMenu === "users"
                ?
                "bg-gray-200"
                :
                "hover:bg-gray-100"
              }`}
            >
              Manage Users
            </button>






            <button
              onClick={() =>
                setActiveMenu("courses")
              }
              className={`cursor-pointer rounded-lg px-4 py-2 ${
                activeMenu === "courses"
                ?
                "bg-gray-200"
                :
                "hover:bg-gray-100"
              }`}
            >
              Manage Courses
            </button>







            <button
              onClick={() =>
                setActiveMenu("teacher")
              }
              className={`cursor-pointer rounded-lg px-4 py-2 ${
                activeMenu === "teacher"
                ?
                "bg-gray-200"
                :
                "hover:bg-gray-100"
              }`}
            >
              Assign Teacher
            </button>







            <button
              onClick={() =>
                setActiveMenu("studentCourses")
              }
              className={`cursor-pointer rounded-lg px-4 py-2 ${
                activeMenu === "studentCourses"
                ?
                "bg-gray-200"
                :
                "hover:bg-gray-100"
              }`}
            >
              Assign Student
            </button>







            <button
              onClick={() =>
                setActiveMenu("submissions")
              }
              className={`cursor-pointer rounded-lg px-4 py-2 ${
                activeMenu === "submissions"
                ?
                "bg-gray-200"
                :
                "hover:bg-gray-100"
              }`}
            >
              Assignment Submissions
            </button>







            <button
              onClick={handleLogout}
              className="ml-3 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>




          </div>


        </div>


      </nav>





      <div className="mx-auto max-w-7xl p-8">


        <div className="rounded-xl bg-white p-6 text-gray-600 shadow">


          {renderContent()}


        </div>


      </div>



    </main>

  );

}
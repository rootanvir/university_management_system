"use client"
import Image from "next/image";
import student from "./student/page";
import { Children, useState } from "react";
import Student from "./student/page";
import Teacher from "./teacher/page";
import Admin from "./admin/page";
import Login from "./login/page";

export default function Home() {
  return (
    <main>
      <div className="w-full h-full">
        <Login />
      </div>
    </main>
  );
}

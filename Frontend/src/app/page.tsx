"use client"
import Image from "next/image";
import student from "./student/page";
import { Children, useState } from "react";
import Student from "./student/page";
import Teacher from "./teacher/page";
import Admin from "./admin/page";

export default function Home() {
  const [active,setActive] = useState("");
  return (
    <main>
      <div className="border m-2 w-full h-full">
        <div className="border justify-around m-5 p-5 flex">
          <button onClick={()=> setActive("one")} className="border p-5 cursor-pointer">Button one</button>
          <button onClick={()=> setActive("two")} className="border p-5 cursor-pointer">Button two</button>
        </div>
        <div className="border w-auto h-100 m-5">
          {active === "one" && <p>You click button one 11111</p>}
          {active === "two" && <p>You click button two 22222</p>}
        </div>
      </div>
    </main>
  );
}

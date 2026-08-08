import Image from "next/image";
import student from "./student/page";
import { Children } from "react";
import Student from "./student/page";
import Teacher from "./teacher/page";
import Admin from "./admin/page";

export default function Home() {
  return (
    <main>
      <Admin />
    </main>
  );
}

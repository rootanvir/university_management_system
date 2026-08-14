"use client";

import { useEffect, useState } from "react";


type Course = {
    course_id: number;
    course_name: string;
    course_credit: number;
};


type Assignment = {
    assignment_id: number;
    assignment_title: string;
    assignment_description: string;
    assignment_deadline: string;
    course_id: number;
    course_name: string;
    teacher_name: string;
    total_mark: number;
    status: string;
};



export default function Assignments() {


    const [assignments, setAssignments] =
        useState<Assignment[]>([]);


    const [courses, setCourses] =
        useState<Course[]>([]);



    const [showAdd, setShowAdd] =
        useState(false);


    const [loading, setLoading] =
        useState(true);



    const [title, setTitle] =
        useState("");


    const [description, setDescription] =
        useState("");


    const [deadline, setDeadline] =
        useState("");


    const [courseId, setCourseId] =
        useState("");


    const [totalMark, setTotalMark] =
        useState("");




    const user =
        JSON.parse(
            localStorage.getItem("user") || "{}"
        );


    const teacherId =
        user.user_id;





    const getAssignments = async () => {

        try {

            const response =
                await fetch(
                    "http://localhost:5039/api/Assignments"
                );


            if(!response.ok)
            {
                throw new Error(
                    "Failed to fetch assignments"
                );
            }



            const data =
                await response.json();



            setAssignments(data);



        }
        catch(error)
        {
            console.error(error);
        }
        finally
        {
            setLoading(false);
        }

    };






    const getCourses = async () => {


        try {

            const response =
                await fetch(
                    "http://localhost:5039/api/Courses"
                );


            const data =
                await response.json();



            setCourses(data);


        }
        catch(error)
        {
            console.error(error);
        }

    };







    useEffect(()=>{

        getAssignments();

        getCourses();

    },[]);









    const handleCreateAssignment = async () => {



        if(
            !title ||
            !description ||
            !deadline ||
            !courseId ||
            !totalMark
        )
        {
            alert(
                "Please fill in all fields."
            );

            return;
        }






        try {


            const tokenCookie =
                document.cookie
                .split("; ")
                .find(
                    row =>
                    row.startsWith("token=")
                );



            const token =
                tokenCookie?.split("=")[1];




            if(!token)
            {
                alert(
                    "You are not logged in."
                );

                return;
            }







            const response =
                await fetch(

                    "http://localhost:5039/api/Assignments",

                    {

                        method:"POST",


                        headers:
                        {
                            "Content-Type":
                            "application/json",


                            Authorization:
                            `Bearer ${token}`
                        },



                        body:JSON.stringify({

                            assignment_title:
                            title,


                            assignment_description:
                            description,


                            assignment_deadline:
                            deadline,


                            course_id:
                            Number(courseId),



                            teacher_id:
                            teacherId,



                            total_mark:
                            Number(totalMark)

                        })

                    }

                );







            const result =
                await response.text();





            if(!response.ok)
            {
                alert(result);

                return;
            }






            alert(
                "Assignment created successfully."
            );





            setTitle("");

            setDescription("");

            setDeadline("");

            setCourseId("");

            setTotalMark("");

            setShowAdd(false);




            getAssignments();



        }
        catch(error)
        {
            console.error(error);

            alert(
                "Failed to create assignment."
            );
        }

    };









    const handleDeleteAssignment = async(
        assignmentId:number
    )=>{


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete?"
            );



        if(!confirmDelete)
            return;




        try {


            await fetch(

                `http://localhost:5039/api/Assignments/${assignmentId}`,

                {

                    method:"DELETE"

                }

            );



            getAssignments();


        }
        catch(error)
        {
            console.error(error);
        }

    };









return (

<main className="p-4">


<div className="flex justify-between items-center">


<div>

<h1 className="text-2xl font-semibold">
Assignments
</h1>


<p className="text-gray-500 mt-1">
Create and manage assignments.
</p>


</div>




<button

onClick={()=>
setShowAdd(true)
}

className="rounded-md border px-5 py-2 hover:bg-gray-100"

>
Add Assignment
</button>



</div>









<div className="mt-6 overflow-x-auto border rounded-lg">


<table className="w-full">


<thead>

<tr className="border-b bg-gray-50">


<th className="p-4 text-left">
Assignment
</th>


<th className="p-4 text-left">
Course
</th>


<th className="p-4 text-left">
Deadline
</th>


<th className="p-4 text-left">
Total Mark
</th>


<th className="p-4 text-left">
Action
</th>



</tr>


</thead>





<tbody>


{
loading ?

<tr>
<td
colSpan={5}
className="p-5 text-center"
>
Loading...
</td>
</tr>


:


assignments.map((assignment)=>(


<tr
key={assignment.assignment_id}
className="border-b"
>


<td className="p-4">
{assignment.assignment_title}
</td>



<td className="p-4">
{assignment.course_name}
</td>



<td className="p-4">

{
new Date(
assignment.assignment_deadline
)
.toLocaleDateString()
}

</td>




<td className="p-4">

{
assignment.total_mark
}

</td>





<td className="p-4">


<button

onClick={()=>
handleDeleteAssignment(
assignment.assignment_id
)
}

className="border border-red-500 text-red-500 px-4 py-2 rounded"

>
Delete
</button>


</td>



</tr>


))


}



</tbody>


</table>


</div>









{
showAdd &&


<div className="fixed inset-0 bg-black/40 flex items-center justify-center">


<div className="bg-white p-6 rounded-xl w-full max-w-lg">


<h2 className="text-xl font-semibold">
Add Assignment
</h2>






<input

placeholder="Assignment Title"

value={title}

onChange={
e=>setTitle(e.target.value)
}

className="mt-4 w-full border p-2 rounded"

/>






<textarea

placeholder="Description"

value={description}

onChange={
e=>setDescription(e.target.value)
}

className="mt-4 w-full border p-2 rounded"

/>









<select

value={courseId}

onChange={
e=>setCourseId(e.target.value)
}

className="mt-4 w-full border p-2 rounded"

>


<option value="">
Select Course
</option>



{
courses.map(course=>(

<option

key={course.course_id}

value={course.course_id}

>

{course.course_name}

</option>


))
}



</select>









<input

type="datetime-local"

value={deadline}

onChange={
e=>setDeadline(e.target.value)
}

className="mt-4 w-full border p-2 rounded"

/>








<input

type="number"

placeholder="Total Mark"

value={totalMark}

onChange={
e=>setTotalMark(e.target.value)
}

className="mt-4 w-full border p-2 rounded"

/>







<div className="mt-6 flex justify-end gap-3">


<button

onClick={()=>
setShowAdd(false)
}

className="border px-5 py-2 rounded"

>
Cancel
</button>





<button

onClick={handleCreateAssignment}

className="bg-black text-white px-5 py-2 rounded"

>
Create Assignment
</button>



</div>





</div>


</div>



}





</main>

);


}
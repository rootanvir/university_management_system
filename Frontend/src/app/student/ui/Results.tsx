"use client";

import { useEffect, useState } from "react";


type Result = {

    assignment_title:string;

    course_name:string;

    total_mark:number;

    obtained_mark:number | null;

    feedback:string | null;

    submitted_at:string;

};



export default function StudentResult(){


    const [results,setResults] =
        useState<Result[]>([]);


    const [loading,setLoading] =
        useState(true);





    useEffect(()=>{

        getResults();

    },[]);






    const getResults = async()=>{


        try{


            const user =
                JSON.parse(
                    localStorage.getItem("user") || "{}"
                );


            const studentId =
                user.user_id;



            if(!studentId)
            {
                return;
            }





            const response =
                await fetch(

                `http://localhost:5039/api/AssignmentSubmissions/student-result/${studentId}`

                );



            if(!response.ok)
            {
                throw new Error(
                    "Failed to fetch result"
                );
            }




            const data =
                await response.json();



            setResults(data);



        }
        catch(error)
        {

            console.log(error);

        }
        finally
        {

            setLoading(false);

        }


    };








    const getGrade = (
        obtained:number | null,
        total:number
    )=>{


        if(obtained === null)
        {
            return "Not Graded";
        }


        const percentage =
            (obtained / total) * 100;



        if(percentage >= 80)
            return "A+";


        if(percentage >= 70)
            return "A";


        if(percentage >= 60)
            return "B";


        if(percentage >= 50)
            return "C";


        return "F";

    };









return (

<main className="p-4">


<div>

<h1 className="text-2xl font-semibold text-gray-900">
    My Result
</h1>


<p className="mt-1 text-gray-500">
    View your assignment marks and feedback.
</p>


</div>





<div className="mt-6 overflow-x-auto rounded-lg border">


<table className="w-full">


<thead>


<tr className="border-b bg-gray-50">


<th className="p-4 text-left">
Course
</th>


<th className="p-4 text-left">
Assignment
</th>


<th className="p-4 text-left">
Total Mark
</th>


<th className="p-4 text-left">
Obtained
</th>


<th className="p-4 text-left">
Grade
</th>


<th className="p-4 text-left">
Feedback
</th>


</tr>


</thead>





<tbody>


{
loading ?

(

<tr>

<td
colSpan={6}
className="p-6 text-center text-gray-500"
>

Loading...

</td>

</tr>


)


:


results.length === 0 ?


(

<tr>

<td
colSpan={6}
className="p-6 text-center text-gray-500"
>

No result available.

</td>

</tr>


)


:


results.map((result,index)=>(


<tr
key={index}
className="border-b"
>


<td className="p-4">
{result.course_name}
</td>



<td className="p-4">
{result.assignment_title}
</td>




<td className="p-4">
{result.total_mark}
</td>





<td className="p-4">


{
result.obtained_mark === null

?

"Pending"

:

result.obtained_mark

}


</td>






<td className="p-4">


{
getGrade(
    result.obtained_mark,
    result.total_mark
)
}


</td>







<td className="p-4">


{
result.feedback

?

result.feedback

:

"Not available"

}


</td>






</tr>


))


}



</tbody>



</table>


</div>




</main>


);


}
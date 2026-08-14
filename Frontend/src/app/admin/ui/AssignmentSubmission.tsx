"use client";

import { useEffect, useState } from "react";


type Submission = {

    submission_id:number;

    student_id:number;

    student_name:string;

    assignment_title:string;

    course_name:string;

    submitted_at:string;

    total_mark:number;

    obtained_mark:number | null;

    feedback:string | null;

};




export default function AssignmentSubmission(){


    const [submissions,setSubmissions] =
        useState<Submission[]>([]);


    const [loading,setLoading] =
        useState(true);





    useEffect(()=>{

        getSubmissions();

    },[]);






    const getSubmissions = async()=>{


        try{


            const response =
                await fetch(
                    "http://localhost:5039/api/AssignmentSubmissions"
                );



            if(!response.ok)
            {
                throw new Error(
                    "Failed to load submissions"
                );
            }



            const data =
                await response.json();



            console.log(data);



            setSubmissions(data);



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






    return (

        <main className="p-10">


            <div>


                <h1 className="text-2xl font-semibold">
                    Assignment Submissions
                </h1>


                <p className="mt-1 text-gray-500">
                    View student assignment submissions.
                </p>


            </div>







            <div className="mt-6 overflow-x-auto rounded-lg border">


                <table className="w-full">


                    <thead>


                        <tr className="border-b bg-gray-50">


                            <th className="p-4 text-left">
                                Student ID
                            </th>


                            <th className="p-4 text-left">
                                Student Name
                            </th>


                            <th className="p-4 text-left">
                                Assignment
                            </th>


                            <th className="p-4 text-left">
                                Course
                            </th>


                            <th className="p-4 text-left">
                                Total Mark
                            </th>


                            <th className="p-4 text-left">
                                Obtained
                            </th>


                            <th className="p-4 text-left">
                                Status
                            </th>


                            <th className="p-4 text-left">
                                Submitted
                            </th>


                        </tr>


                    </thead>





                    <tbody>


                    {

                    loading ?


                    (

                        <tr>

                            <td
                            colSpan={8}
                            className="p-6 text-center"
                            >

                                Loading...

                            </td>


                        </tr>


                    )



                    :



                    submissions.length === 0 ?


                    (

                        <tr>

                            <td
                            colSpan={8}
                            className="p-6 text-center text-gray-500"
                            >

                                No submissions found.

                            </td>


                        </tr>


                    )



                    :



                    submissions.map((submission)=>(


                        <tr
                        key={submission.submission_id}
                        className="border-b"
                        >



                            <td className="p-4">
                                {submission.student_id}
                            </td>



                            <td className="p-4">
                                {submission.student_name}
                            </td>




                            <td className="p-4">
                                {submission.assignment_title}
                            </td>




                            <td className="p-4">
                                {submission.course_name}
                            </td>





                            <td className="p-4">
                                {submission.total_mark}
                            </td>





                            <td className="p-4">


                            {
                                submission.obtained_mark === null

                                ?

                                "Not graded"

                                :

                                submission.obtained_mark

                            }


                            </td>






                            <td className="p-4">


                            {
                                submission.obtained_mark === null

                                ?

                                "Pending"

                                :

                                "Graded"

                            }


                            </td>







                            <td className="p-4">


                            {
                                new Date(
                                    submission.submitted_at
                                )
                                .toLocaleDateString()
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
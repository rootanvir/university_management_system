"use client";

import { useEffect, useState } from "react";


type Assignment = {
    assignment_id: number;
    assignment_title: string;
    assignment_description: string;
    assignment_deadline: string;
    course_id: number;
    course_name: string;
    status: string;
};



export default function Assignments() {


    const [assignments, setAssignments] =
        useState<Assignment[]>([]);


    const [loading, setLoading] =
        useState(true);



    const [selectedFiles, setSelectedFiles] =
        useState<Record<number, File | null>>({});





    useEffect(() => {

        getAssignments();

    }, []);






    const getAssignments = async () => {

        try {


            const user =
                JSON.parse(
                    localStorage.getItem("user") || "{}"
                );


            const studentId = user.user_id;


            if (!studentId) {
                return;
            }




            const response =
                await fetch(
                    `http://localhost:5039/api/Assignments/student/${studentId}`
                );



            if (!response.ok) {

                throw new Error(
                    "Failed to fetch assignments"
                );

            }



            const data =
                await response.json();



            console.log(
                "Assignment API:",
                data
            );



            setAssignments(data);



        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };









    const handleFileChange = (
        assignmentId: number,
        file: File | null
    ) => {


        setSelectedFiles(prev => ({

            ...prev,

            [assignmentId]: file

        }));


    };









    const handleSubmit = async (
        assignment: Assignment
    ) => {

        const user =
            JSON.parse(
                localStorage.getItem("user") || "{}"
            );


        const studentId = user.user_id;



        const file =
            selectedFiles[
            assignment.assignment_id
            ];



        if (!file) {

            alert(
                "Please select a file first"
            );

            return;
        }




        // Deadline check (frontend protection)

        if (
            new Date() >
            new Date(
                assignment.assignment_deadline
            )
        ) {

            alert(
                "Submission deadline has passed"
            );

            return;
        }




        const formData =
            new FormData();



        // IMPORTANT
        // Backend expects these as FromForm

        formData.append(
            "assignment_id",
            assignment.assignment_id.toString()
        );


        formData.append(
            "student_id",
            studentId.toString()
        );


        formData.append(
            "file",
            file
        );





        try {


            const response =
                await fetch(

                    "http://localhost:5039/api/AssignmentSubmissions",

                    {
                        method: "POST",
                        body: formData
                    }

                );




            const result =
                await response.text();




            if (!response.ok) {

                alert(result);

                return;

            }




            alert(
                "Assignment submitted successfully"
            );



            // reload status from database

            getAssignments();



        }
        catch (error) {

            console.error(error);


            alert(
                "Submission failed"
            );

        }


    };









    return (

        <div>


            <h1 className="text-2xl font-semibold text-gray-900">
                Assignments
            </h1>


            <p className="mt-1 text-gray-500">
                View and submit your assignments.
            </p>





            <div className="mt-6 space-y-6">


                {
                    loading ?

                        (
                            <p>
                                Loading assignments...
                            </p>
                        )

                        :

                        assignments.length === 0 ?

                            (
                                <div className="rounded-lg border p-6">
                                    No assignments available.
                                </div>
                            )

                            :

                            assignments.map((assignment) => {


                                const submitted =
                                    assignment.status === "Submitted";



                                const deadlineOver =
                                    new Date() >
                                    new Date(
                                        assignment.assignment_deadline
                                    );



                                return (

                                    <div

                                        key={
                                            assignment.assignment_id
                                        }


                                        className={`
                            rounded-xl border p-6 shadow-sm

                            ${submitted
                                                ?
                                                "bg-green-100 border-green-500"

                                                :

                                                deadlineOver

                                                    ?

                                                    "bg-red-100 border-red-500"

                                                    :

                                                    "bg-white"

                                            }
                        `}

                                    >





                                        <div className="flex justify-between">


                                            <div>


                                                <h2 className="text-xl font-semibold text-gray-900">

                                                    {
                                                        assignment.assignment_title
                                                    }

                                                </h2>


                                                <p className="text-sm text-gray-500 mt-1">

                                                    Course:
                                                    {" "}
                                                    {
                                                        assignment.course_name
                                                    }

                                                </p>


                                            </div>





                                            <span className="rounded-full border px-4 py-1 text-sm">


                                                {
                                                    submitted

                                                        ?

                                                        "Submitted"

                                                        :

                                                        deadlineOver

                                                            ?

                                                            "Deadline Over"

                                                            :

                                                            "Pending"

                                                }


                                            </span>


                                        </div>








                                        <div className="mt-5 rounded-lg border p-5">


                                            <h3 className="font-semibold">

                                                Assignment Details

                                            </h3>


                                            <p className="mt-3 text-gray-600">

                                                {
                                                    assignment.assignment_description
                                                }

                                            </p>


                                        </div>








                                        {
                                            !submitted &&
                                            !deadlineOver &&


                                            <div className="mt-5">


                                                <label className="text-sm font-medium">

                                                    Upload Assignment

                                                </label>



                                                <input

                                                    type="file"


                                                    onChange={(e) =>

                                                        handleFileChange(

                                                            assignment.assignment_id,

                                                            e.target.files?.[0] ?? null

                                                        )

                                                    }


                                                    className="mt-2 block w-full rounded-md border p-2"

                                                />


                                            </div>

                                        }







                                        <div className="mt-5 flex justify-end">


                                            <button

                                                type="button"


                                                disabled={
                                                    submitted ||
                                                    deadlineOver
                                                }


                                                onClick={() =>
                                                    handleSubmit(
                                                        assignment
                                                    )
                                                }


                                                className={`

                                rounded-md border px-5 py-2 font-medium


                                ${submitted ||
                                                        deadlineOver

                                                        ?

                                                        "cursor-not-allowed bg-gray-200 text-gray-400"

                                                        :

                                                        "cursor-pointer hover:bg-gray-100"

                                                    }

                            `}

                                            >


                                                {

                                                    submitted

                                                        ?

                                                        "Submitted"

                                                        :

                                                        deadlineOver

                                                            ?

                                                            "Deadline Over"

                                                            :

                                                            "Submit Assignment"

                                                }


                                            </button>


                                        </div>







                                    </div>

                                );


                            })


                }


            </div>



        </div>

    );

}
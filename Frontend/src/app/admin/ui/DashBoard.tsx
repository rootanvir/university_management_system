"use client";

import { useEffect, useState } from "react";


type DashboardData = {

    totalUsers:number;

    totalTeachers:number;

    totalStudents:number;

    totalCourses:number;

    totalAssignments:number;

    totalSubmissions:number;

};





export default function Dashboard(){


    const [data,setData] =
        useState<DashboardData | null>(null);


    const [loading,setLoading] =
        useState(true);






    useEffect(()=>{


        getDashboard();


    },[]);







    const getDashboard = async()=>{


        try{


            const response =
                await fetch(
                    "http://localhost:5039/api/Dashboard"
                );



            if(!response.ok)
            {
                throw new Error(
                    "Failed to fetch dashboard"
                );
            }



            const result =
                await response.json();



            console.log(result);



            setData(result);



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







    const stats = [


        {
            title:"Total Users",
            value:data?.totalUsers ?? 0,
            description:"Registered users"
        },


        {
            title:"Teachers",
            value:data?.totalTeachers ?? 0,
            description:"Active teachers"
        },


        {
            title:"Students",
            value:data?.totalStudents ?? 0,
            description:"Active students"
        },


        {
            title:"Courses",
            value:data?.totalCourses ?? 0,
            description:"Available courses"
        },


        {
            title:"Assignments",
            value:data?.totalAssignments ?? 0,
            description:"Created assignments"
        },


        {
            title:"Submissions",
            value:data?.totalSubmissions ?? 0,
            description:"Student submissions"
        }


    ];







    return(


        <div>


            <h2 className="text-2xl font-bold text-gray-900">
                Dashboard
            </h2>


            <p className="mt-1 text-gray-600">
                Overview of your LMS system.
            </p>







            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">


            {


            loading ?


            (

                <p>
                    Loading dashboard...
                </p>

            )


            :


            stats.map((stat)=>(


                <div

                key={stat.title}

                className="rounded-xl border bg-white p-5 shadow-sm"

                >


                    <p className="text-sm font-medium text-gray-500">

                        {stat.title}

                    </p>



                    <h3 className="mt-2 text-3xl font-bold text-gray-900">

                        {stat.value}

                    </h3>



                    <p className="mt-2 text-sm text-gray-500">

                        {stat.description}

                    </p>



                </div>


            ))


            }


            </div>







            <div className="mt-8">


                <h3 className="text-xl font-semibold text-gray-900">
                    System Summary
                </h3>




                <div className="mt-4 rounded-xl border bg-white p-6">


                    <div className="grid gap-5 md:grid-cols-3">



                        <div>

                            <p className="text-sm text-gray-500">
                                Assignments Created
                            </p>


                            <p className="mt-1 text-xl font-semibold">

                                {data?.totalAssignments ?? 0}

                            </p>

                        </div>





                        <div>

                            <p className="text-sm text-gray-500">
                                Submitted Assignments
                            </p>


                            <p className="mt-1 text-xl font-semibold">

                                {data?.totalSubmissions ?? 0}

                            </p>

                        </div>






                        <div>

                            <p className="text-sm text-gray-500">
                                Total Courses
                            </p>


                            <p className="mt-1 text-xl font-semibold">

                                {data?.totalCourses ?? 0}

                            </p>

                        </div>



                    </div>



                </div>


            </div>





        </div>


    );


}
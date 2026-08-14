"use client";

import { useEffect, useState } from "react";


type Submission = {

  submission_id: number;

  student_name: string;

  assignment_title: string;

  total_mark: number;

  obtained_mark: number | null;

  feedback: string | null;

  submitted_at: string;

};



export default function Submissions() {


  const [submissions, setSubmissions] =
    useState<Submission[]>([]);


  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    getSubmissions();

  }, []);





  const getSubmissions = async () => {


    try {


      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );


      const teacherId =
        user.user_id;



      const response =
        await fetch(

          `http://localhost:5039/api/AssignmentSubmissions/teacher/${teacherId}`

        );



      if (!response.ok) {
        throw new Error(
          "Failed to load submissions"
        );
      }



      const data =
        await response.json();



      setSubmissions(data);



    }
    catch (error) {

      console.log(error);

    }
    finally {

      setLoading(false);

    }


  };








  const updateField = (
    id: number,
    field: string,
    value: any
  ) => {


    setSubmissions(prev =>

      prev.map(item =>

        item.submission_id === id

          ?

          {
            ...item,
            [field]: value
          }

          :

          item

      )

    );


  };








  const saveGrade = async (
    submission: Submission
  ) => {


    try {


      const response =
        await fetch(

          `http://localhost:5039/api/AssignmentSubmissions/${submission.submission_id}/grade`,

          {

            method: "PUT",

            headers: {
              "Content-Type": "application/json"
            },


            body: JSON.stringify({

              obtained_mark:
                submission.obtained_mark,


              feedback:
                submission.feedback

            })

          }

        );




      const result =
        await response.text();



      if (!response.ok) {
        alert(result);
        return;
      }



      alert(
        "Grade saved"
      );


    }
    catch (error) {

      console.log(error);

      alert(
        "Failed"
      );

    }


  };









  return (

    <main className="p-4">


      <h1 className="text-2xl font-semibold">
        Submissions
      </h1>


      <p className="mt-1 text-gray-500">
        Grade student assignments.
      </p>




      <div className="mt-6 overflow-x-auto border rounded-lg">


        <table className="w-full">


          <thead>

            <tr className="border-b bg-gray-50">


              <th className="p-4 text-left">
                Student
              </th>


              <th className="p-4 text-left">
                Assignment
              </th>


              <th className="p-4 text-left">
                Total Mark
              </th>


              <th className="p-4 text-left">
                Obtained Mark
              </th>


              <th className="p-4 text-left">
                Feedback
              </th>


              <th className="p-4">
                Action
              </th>


            </tr>


          </thead>



          <tbody>


            {
              loading ?

                <tr>

                  <td
                    colSpan={6}
                    className="p-5 text-center"
                  >
                    Loading...
                  </td>

                </tr>


                :


                submissions.map(item => (


                  <tr
                    key={item.submission_id}
                    className="border-b"
                  >


                    <td className="p-4">
                      {item.student_name}
                    </td>



                    <td className="p-4">
                      {item.assignment_title}
                    </td>



                    <td className="p-4">
                      {item.total_mark}
                    </td>




                    <td className="p-4">


                      <input

                        type="number"

                        value={
                          item.obtained_mark ?? ""
                        }

                        onChange={(e) =>

                          updateField(

                            item.submission_id,

                            "obtained_mark",

                            Number(e.target.value)

                          )

                        }


                        className="border rounded p-2 w-24"

                      />


                    </td>






                    <td className="p-4">


                      <textarea

                        value={
                          item.feedback ?? ""
                        }


                        onChange={(e) =>

                          updateField(

                            item.submission_id,

                            "feedback",

                            e.target.value

                          )

                        }


                        className="border rounded p-2"

                        rows={2}

                      />


                    </td>






                    <td className="p-4">


                      <button

                        onClick={() =>
                          saveGrade(item)
                        }


                        className="border rounded px-4 py-2 hover:bg-gray-100"

                      >

                        Save

                      </button>


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
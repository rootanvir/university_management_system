using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller;


[ApiController]
[Route("api/[controller]")]
public class AssignmentSubmissionsController : ControllerBase
{

    private readonly ApplicationDbContext _dbconnection;


    public AssignmentSubmissionsController(
        ApplicationDbContext dbconnection
    )
    {
        _dbconnection = dbconnection;
    }



    [HttpPost]
    public async Task<IActionResult> SubmitAssignment(
        [FromForm] int assignment_id,
        [FromForm] int student_id,
        [FromForm] IFormFile? file
    )
    {

        Console.WriteLine("Checking assignment...");


        var assignment = await _dbconnection.Assignments
            .FirstOrDefaultAsync(a =>
                a.assignment_id == assignment_id
            );


        if (assignment == null)
        {
            return NotFound("Assignment not found.");
        }



        Console.WriteLine(
            "Assignment found: "
            + assignment.assignment_title
        );



        // Deadline check

        if (DateTime.UtcNow > assignment.assignment_deadline)
        {
            return BadRequest(
                "Submission deadline has passed."
            );
        }




        Console.WriteLine("Checking student...");



        var student = await _dbconnection.Users
            .FirstOrDefaultAsync(u =>
                u.user_id == student_id &&
                u.user_role == "Student"
            );



        if (student == null)
        {
            return BadRequest(
                "Invalid student."
            );
        }



        // Check duplicate submission

        var exists = await _dbconnection.AssignmentSubmissions
            .AnyAsync(s =>
                s.assignment_id == assignment_id &&
                s.student_id == student_id
            );


        if (exists)
        {
            return BadRequest(
                "Assignment already submitted."
            );
        }




        var submission = new AssignmentSubmission
        {

            assignment_id = assignment_id,

            student_id = student_id,


            file_name = file != null
                ? file.FileName
                : "No file",


            submitted_at = DateTime.UtcNow,


            total_mark = 100,


            obtained_mark = null,


            feedback = null

        };



        _dbconnection.AssignmentSubmissions.Add(
            submission
        );


        await _dbconnection.SaveChangesAsync();



        return Ok(new
        {
            message = "Assignment submitted successfully."
        });


    }

    [HttpGet("teacher/{teacher_id}")]
    public async Task<IActionResult> GetTeacherSubmissions(int teacher_id)
    {

        var submissions = await _dbconnection.AssignmentSubmissions

            .Join(
                _dbconnection.Assignments,

                submission => submission.assignment_id,

                assignment => assignment.assignment_id,

                (submission, assignment) => new
                {
                    submission,
                    assignment
                }
            )


            .Where(x =>
                x.assignment.teacher_id == teacher_id
            )


            .Join(
                _dbconnection.Users,

                x => x.submission.student_id,

                student => student.user_id,

                (x, student) => new
                {
                    submission_id = x.submission.submission_id,

                    student_name = student.user_name,


                    assignment_title =
                        x.assignment.assignment_title,


                    assignment_id =
                        x.assignment.assignment_id,


                    total_mark =
                        x.submission.total_mark,


                    obtained_mark =
                        x.submission.obtained_mark,


                    feedback =
                        x.submission.feedback,


                    submitted_at =
                        x.submission.submitted_at,


                    file_name =
                        x.submission.file_name
                }

            )


            .ToListAsync();



        return Ok(submissions);

    }

    [HttpPut("{submission_id}/grade")]
    public async Task<IActionResult> GradeSubmission(
    int submission_id,
    [FromBody] GradeRequest request
)
    {

        var submission =
            await _dbconnection.AssignmentSubmissions
            .FirstOrDefaultAsync(
                x => x.submission_id == submission_id
            );


        if (submission == null)
        {
            return NotFound(
                "Submission not found"
            );
        }



        submission.obtained_mark =
            request.obtained_mark;


        submission.feedback =
            request.feedback;



        await _dbconnection.SaveChangesAsync();



        return Ok(new
        {
            message = "Assignment graded successfully"
        });

    }

    [HttpGet("student-result/{student_id}")]
    public async Task<IActionResult> GetStudentResult(int student_id)
    {

        var results = await _dbconnection.AssignmentSubmissions

            .Where(s => s.student_id == student_id)


            .Join(
                _dbconnection.Assignments,

                submission => submission.assignment_id,

                assignment => assignment.assignment_id,

                (submission, assignment) => new
                {
                    submission,
                    assignment
                }
            )


            .Join(
                _dbconnection.Courses,

                x => x.assignment.course_id,

                course => course.course_id,

                (x, course) => new
                {

                    assignment_title =
                        x.assignment.assignment_title,


                    course_name =
                        course.course_name,


                    total_mark =
                        x.submission.total_mark,


                    obtained_mark =
                        x.submission.obtained_mark,


                    feedback =
                        x.submission.feedback,


                    submitted_at =
                        x.submission.submitted_at

                }

            )


            .ToListAsync();



        return Ok(results);

    }
    [HttpGet]
    public async Task<IActionResult> GetSubmissions()
    {

        var submissions = await _dbconnection.AssignmentSubmissions

            .Join(
                _dbconnection.Users,
                submission => submission.student_id,
                student => student.user_id,
                (submission, student) => new
                {
                    submission,
                    student
                }
            )


            .Join(
                _dbconnection.Assignments,
                x => x.submission.assignment_id,
                assignment => assignment.assignment_id,
                (x, assignment) => new
                {
                    x.submission,
                    x.student,
                    assignment
                }
            )


            .Join(
                _dbconnection.Courses,
                x => x.assignment.course_id,
                course => course.course_id,
                (x, course) => new
                {

                    submission_id =
                        x.submission.submission_id,


                    student_id =
                        x.student.user_id,


                    student_name =
                        x.student.user_name,


                    assignment_id =
                        x.assignment.assignment_id,


                    assignment_title =
                        x.assignment.assignment_title,


                    course_name =
                        course.course_name,


                    submitted_at =
                        x.submission.submitted_at,


                    total_mark =
                        x.submission.total_mark,


                    obtained_mark =
                        x.submission.obtained_mark,


                    feedback =
                        x.submission.feedback

                }
            )

            .ToListAsync();



        return Ok(submissions);

    }

}
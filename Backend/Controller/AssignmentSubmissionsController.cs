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

        if(DateTime.UtcNow > assignment.assignment_deadline)
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



        if(student == null)
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


        if(exists)
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


            submitted_at = DateTime.UtcNow

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

}
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class AssignmentsController : ControllerBase
{
    private readonly ApplicationDbContext _dbconnection;

    public AssignmentsController(ApplicationDbContext dbconnection)
    {
        _dbconnection = dbconnection;
    }

    [HttpGet]
    public async Task<IActionResult> GetAssignments()
    {
        var assignments = await _dbconnection.Assignments
            .Include(a => a.Course)
            .Include(a => a.Teacher)
            .Select(a => new
            {
                a.assignment_id,
                a.assignment_title,
                a.assignment_description,
                a.assignment_deadline,
                a.course_id,
                course_name = a.Course!.course_name,
                a.teacher_id,
                teacher_name = a.Teacher!.user_name
            })
            .ToListAsync();

        return Ok(assignments);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAssignment(Assignment assignment)
    {
        var courseExists = await _dbconnection.Courses
            .AnyAsync(c => c.course_id == assignment.course_id);

        if (!courseExists)
        {
            return BadRequest("Course does not exist.");
        }

        var teacherExists = await _dbconnection.Users
            .AnyAsync(u =>
                u.user_id == assignment.teacher_id &&
                u.user_role == "Teacher"
            );

        if (!teacherExists)
        {
            return BadRequest("Teacher does not exist.");
        }

        // Convert deadline to UTC
        assignment.assignment_deadline =
            DateTime.SpecifyKind(
                assignment.assignment_deadline,
                DateTimeKind.Utc
            );

        _dbconnection.Assignments.Add(assignment);

        await _dbconnection.SaveChangesAsync();

        return Ok(assignment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAssignment(int id)
    {
        var assignment = await _dbconnection.Assignments
            .FirstOrDefaultAsync(a => a.assignment_id == id);

        if (assignment == null)
        {
            return NotFound("Assignment does not exist.");
        }

        _dbconnection.Assignments.Remove(assignment);
        await _dbconnection.SaveChangesAsync();

        return Ok("Assignment deleted successfully.");
    }
    [HttpGet("student/{student_id}")]
    public async Task<IActionResult> GetStudentAssignments(int student_id)
    {
        var assignments = await _dbconnection.StudentCourses

            // Student enrolled courses
            .Where(sc => sc.student_id == student_id)


            // Get assignments of those courses
            .Join(
                _dbconnection.Assignments,
                sc => sc.course_id,
                assignment => assignment.course_id,
                (sc, assignment) => new
                {
                    assignment
                }
            )


            // Get course name
            .Join(
                _dbconnection.Courses,
                x => x.assignment.course_id,
                course => course.course_id,
                (x, course) => new
                {
                    x.assignment.assignment_id,

                    x.assignment.assignment_title,

                    x.assignment.assignment_description,

                    x.assignment.assignment_deadline,


                    // ADD THIS
                    x.assignment.total_mark,


                    course_id = course.course_id,

                    course_name = course.course_name
                }
            )


            // Add submission status
            .Select(x => new
            {
                x.assignment_id,

                x.assignment_title,

                x.assignment_description,

                x.assignment_deadline,


                // ADD THIS
                x.total_mark,


                x.course_id,

                x.course_name,


                status =
                    _dbconnection.AssignmentSubmissions.Any(
                        s =>
                        s.assignment_id == x.assignment_id &&
                        s.student_id == student_id
                    )
                    ?
                    "Submitted"
                    :
                    "Pending"
            })

            .ToListAsync();


        return Ok(assignments);
    }

}
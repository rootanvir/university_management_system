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
}
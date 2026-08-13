using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class TeacherCoursesController : ControllerBase
{
    private readonly ApplicationDbContext _dbconnection;

    public TeacherCoursesController(ApplicationDbContext dbconnection)
    {
        _dbconnection = dbconnection;
    }

    [HttpGet]
    public async Task<IActionResult> GetAssignments()
    {
        var assignments = await _dbconnection.TeacherCourses
            .Join(
                _dbconnection.Users,
                tc => tc.teacher_id,
                teacher => teacher.user_id,
                (tc, teacher) => new
                {
                    tc.teacher_course_id,
                    tc.course_id,
                    Teacher = teacher.user_name,
                    teacher_id = teacher.user_id
                }
            )
            .Join(
                _dbconnection.Courses,
                tc => tc.course_id,
                course => course.course_id,
                (tc, course) => new
                {
                    tc.teacher_course_id,
                    tc.teacher_id,
                    tc.Teacher,
                    course_id = course.course_id,
                    Course = course.course_name
                }
            )
            .ToListAsync();

        return Ok(assignments);
    }

    [HttpPost]
    public async Task<IActionResult> AssignTeacher(TeacherCourse assignment)
    {
        var teacher = await _dbconnection.Users
            .FirstOrDefaultAsync(u =>
                u.user_id == assignment.teacher_id &&
                u.user_role == "Teacher");

        if (teacher == null)
        {
            return BadRequest("Invalid teacher.");
        }

        var course = await _dbconnection.Courses
            .FirstOrDefaultAsync(c =>
                c.course_id == assignment.course_id);

        if (course == null)
        {
            return BadRequest("Invalid course.");
        }

        var exists = await _dbconnection.TeacherCourses
            .AnyAsync(tc =>
                tc.teacher_id == assignment.teacher_id &&
                tc.course_id == assignment.course_id);

        if (exists)
        {
            return BadRequest("Teacher is already assigned to this course.");
        }

        _dbconnection.TeacherCourses.Add(assignment);

        await _dbconnection.SaveChangesAsync();

        return Ok(new
        {
            message = "Teacher assigned successfully."
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveAssignment(int id)
    {
        var assignment = await _dbconnection.TeacherCourses
            .FirstOrDefaultAsync(tc =>
                tc.teacher_course_id == id);

        if (assignment == null)
        {
            return NotFound("Assignment not found.");
        }

        _dbconnection.TeacherCourses.Remove(assignment);

        await _dbconnection.SaveChangesAsync();

        return Ok(new
        {
            message = "Teacher assignment removed."
        });
    }

    [HttpGet("teacher/{teacherId}")]
    public async Task<IActionResult> GetTeacherCourses(int teacherId)
    {
        var courses = await _dbconnection.TeacherCourses
            .Where(tc => tc.teacher_id == teacherId)
            .Join(
                _dbconnection.Courses,
                tc => tc.course_id,
                course => course.course_id,
                (tc, course) => new
                {
                    course_id = course.course_id,
                    course_name = course.course_name,
                    course_credit = course.course_credit,
                    teacher_id = tc.teacher_id
                }
            )
            .Join(
                _dbconnection.Users,
                tc => tc.teacher_id,
                teacher => teacher.user_id,
                (tc, teacher) => new
                {
                    tc.course_id,
                    tc.course_name,
                    tc.course_credit,
                    teacher_id = teacher.user_id,
                    teacher_name = teacher.user_name
                }
            )
            .ToListAsync();

        return Ok(courses);
    }
}
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly ApplicationDbContext _dbconnection;

    public CoursesController(ApplicationDbContext dbconnection)
    {
        _dbconnection = dbconnection;
    }

    [HttpGet]
    public async Task<IActionResult> GetCourses()
    {
        var courses = await _dbconnection.Courses
            .OrderBy(c => c.course_id)
            .ToListAsync();

        return Ok(courses);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse(Courses course)
    {
        var exists = await _dbconnection.Courses
            .AnyAsync(c => c.course_name == course.course_name);

        if (exists)
        {
            return BadRequest("Course already exists.");
        }

        _dbconnection.Courses.Add(course);
        await _dbconnection.SaveChangesAsync();

        return Ok(course);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, Courses updatedCourse)
    {
        var course = await _dbconnection.Courses
            .FirstOrDefaultAsync(c => c.course_id == id);

        if (course == null)
        {
            return NotFound("Course not found.");
        }

        var exists = await _dbconnection.Courses
            .AnyAsync(c =>
                c.course_name == updatedCourse.course_name &&
                c.course_id != id);

        if (exists)
        {
            return BadRequest("Course already exists.");
        }

        course.course_name = updatedCourse.course_name;
        course.course_credit = updatedCourse.course_credit;

        await _dbconnection.SaveChangesAsync();

        return Ok(course);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var course = await _dbconnection.Courses
            .FirstOrDefaultAsync(c => c.course_id == id);

        if (course == null)
        {
            return NotFound("Course not found.");
        }

        _dbconnection.Courses.Remove(course);
        await _dbconnection.SaveChangesAsync();

        return Ok("Course deleted successfully.");
    }
}
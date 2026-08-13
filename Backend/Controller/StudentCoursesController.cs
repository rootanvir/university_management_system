using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class StudentCoursesController : ControllerBase
{
    private readonly ApplicationDbContext _dbconnection;

    public StudentCoursesController(ApplicationDbContext dbconnection)
    {
        _dbconnection = dbconnection;
    }

    [HttpGet]
    public async Task<IActionResult> GetAssignments()
    {
        var assignments = await _dbconnection.StudentCourses
            .Join(
                _dbconnection.Users,
                sc => sc.student_id,
                student => student.user_id,
                (sc, student) => new
                {
                    sc.student_course_id,
                    sc.course_id,
                    Student = student.user_name
                }
            )
            .Join(
                _dbconnection.Courses,
                sc => sc.course_id,
                course => course.course_id,
                (sc, course) => new
                {
                    sc.student_course_id,
                    Student = sc.Student,
                    Course = course.course_name,
                    course_credit = course.course_credit
                }
            )
            .ToListAsync();

        return Ok(assignments);
    }

    [HttpPost]
    public async Task<IActionResult> AssignStudent(StudentCourse assignment)
    {
        Console.WriteLine("=================================");
        Console.WriteLine("ASSIGN STUDENT API CALLED");
        Console.WriteLine($"Student ID: {assignment.student_id}");
        Console.WriteLine($"Course ID: {assignment.course_id}");

        try
        {
            Console.WriteLine("Checking student...");

            var student = await _dbconnection.Users
                .FirstOrDefaultAsync(u =>
                    u.user_id == assignment.student_id &&
                    u.user_role == "Student");

            if (student == null)
            {
                Console.WriteLine("STUDENT NOT FOUND");

                return BadRequest(new
                {
                    step = "student",
                    message = "Student not found.",
                    student_id = assignment.student_id
                });
            }

            Console.WriteLine($"STUDENT FOUND: {student.user_name}");

            Console.WriteLine("Checking course...");

            var course = await _dbconnection.Courses
                .FirstOrDefaultAsync(c =>
                    c.course_id == assignment.course_id);

            if (course == null)
            {
                Console.WriteLine("COURSE NOT FOUND");

                return BadRequest(new
                {
                    step = "course",
                    message = "Course not found.",
                    course_id = assignment.course_id
                });
            }

            Console.WriteLine($"COURSE FOUND: {course.course_name}");

            Console.WriteLine("Checking existing assignment...");

            var exists = await _dbconnection.StudentCourses
                .AnyAsync(sc =>
                    sc.student_id == assignment.student_id &&
                    sc.course_id == assignment.course_id);

            if (exists)
            {
                Console.WriteLine("ASSIGNMENT ALREADY EXISTS");

                return BadRequest(new
                {
                    step = "duplicate",
                    message = "Student is already assigned to this course."
                });
            }

            Console.WriteLine("Adding student course...");

            _dbconnection.StudentCourses.Add(assignment);

            Console.WriteLine("Saving to database...");

            await _dbconnection.SaveChangesAsync();

            Console.WriteLine("SUCCESS");
            Console.WriteLine("=================================");

            return Ok(new
            {
                message = "Student assigned successfully.",
                student_id = assignment.student_id,
                course_id = assignment.course_id
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine("=================================");
            Console.WriteLine("ERROR OCCURRED");
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.InnerException?.Message);
            Console.WriteLine("=================================");

            return StatusCode(500, new
            {
                message = "Server error.",
                error = ex.Message,
                innerError = ex.InnerException?.Message
            });
        }
    }
    [HttpGet("student/{id}")]
    public async Task<IActionResult> GetStudentCourses(int id)
    {
        var courses = await _dbconnection.StudentCourses
            .Where(sc => sc.student_id == id)

            // StudentCourse -> Course
            .Join(
                _dbconnection.Courses,
                sc => sc.course_id,
                c => c.course_id,
                (sc, c) => new
                {
                    sc.student_course_id,
                    sc.student_id,
                    c.course_id,
                    Course = c.course_name,
                    c.course_credit
                }
            )

            // Course -> TeacherCourse
            .Join(
                _dbconnection.TeacherCourses,
                sc => sc.course_id,
                tc => tc.course_id,
                (sc, tc) => new
                {
                    sc.student_course_id,
                    sc.student_id,
                    sc.course_id,
                    sc.Course,
                    sc.course_credit,
                    tc.teacher_id
                }
            )

            // TeacherCourse -> User
            .Join(
                _dbconnection.Users,
                sc => sc.teacher_id,
                teacher => teacher.user_id,
                (sc, teacher) => new
                {
                    sc.student_course_id,
                    sc.student_id,
                    sc.course_id,
                    sc.Course,
                    sc.course_credit,
                    Teacher = teacher.user_name
                }
            )

            .ToListAsync();


        return Ok(courses);
    }
}
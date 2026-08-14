using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller;


[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{

    private readonly ApplicationDbContext _dbconnection;


    public DashboardController(
        ApplicationDbContext dbconnection
    )
    {
        _dbconnection = dbconnection;
    }





    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {


        var totalUsers =
            await _dbconnection.Users.CountAsync();



        var totalTeachers =
            await _dbconnection.Users
            .CountAsync(
                u => u.user_role == "Teacher"
            );



        var totalStudents =
            await _dbconnection.Users
            .CountAsync(
                u => u.user_role == "Student"
            );



        var totalCourses =
            await _dbconnection.Courses
            .CountAsync();



        var totalAssignments =
            await _dbconnection.Assignments
            .CountAsync();



        var totalSubmissions =
            await _dbconnection.AssignmentSubmissions
            .CountAsync();




        return Ok(new
        {

            totalUsers,

            totalTeachers,

            totalStudents,

            totalCourses,

            totalAssignments,

            totalSubmissions


        });


    }


}
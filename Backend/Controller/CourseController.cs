using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Bakcend.Controller;

[ApiController]
[Route("api/[controller]")]

public class CoursesController : ControllerBase
{
    private readonly ApplicationDbContext _dbconnection;
    public CoursesController(ApplicationDbContext dbconnection)
    {
        _dbconnection = dbconnection;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Courses course)
    {
        _dbconnection.Courses.Add(course);
        await _dbconnection.SaveChangesAsync();
        return Ok(course);
    }
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var course = await _dbconnection.Courses.ToListAsync();

        return Ok(course);
    }
}
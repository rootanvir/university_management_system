using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]

public class AssignmentsController : ControllerBase
{
   private readonly ApplicationDbContext _context;

   public AssignmentsController(ApplicationDbContext context)
    {
        _context = context;
    } 
    [HttpPost]
    public async Task <IActionResult> CreateAssignment(
        Assignment assignment)
    {
        _context.Assignments.Add(assignment);
        await _context.SaveChangesAsync();
        return Ok(assignment);
    }
}
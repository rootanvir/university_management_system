using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bakcend.Controller;

[ApiController]
[Route("api/[controller]")]

public class MarkSheetController : ControllerBase
{
    private readonly ApplicationDbContext _dbconnection;
    public MarkSheetController(ApplicationDbContext dbconnection)
    {
        _dbconnection = dbconnection;
    }

    [HttpPost]
    public async Task<IActionResult> Create(MarkSheet marksheet)
    {
        _dbconnection.MarkSheet.Add(marksheet);
        await _dbconnection.SaveChangesAsync();
        return Ok(marksheet);
    }
}
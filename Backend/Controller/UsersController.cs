using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;


namespace Bakcend.Controller;

[ApiController]
[Route("api/[controller]")]

public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _dbconnection;
    public UsersController(ApplicationDbContext dbconnection)
    {
        _dbconnection = dbconnection;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Users user)
    {
        user.user_password = BCrypt.Net.BCrypt.HashPassword(user.user_password);
        _dbconnection.Users.Add(user);
        await _dbconnection.SaveChangesAsync();
        return Ok(user);
    }
}
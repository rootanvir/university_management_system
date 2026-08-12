using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Backend.DTOs;

namespace Backend.Controller;

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
        var existingUser = await _dbconnection.Users
        .FirstOrDefaultAsync(u => u.user_email == user.user_email);

        if (existingUser != null)
        {
            return BadRequest("Email already exists");
        }
        user.user_password = BCrypt.Net.BCrypt.HashPassword(user.user_password);
        _dbconnection.Users.Add(user);
        await _dbconnection.SaveChangesAsync();
        return Ok(user);
    }
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _dbconnection.Users
            .Select(u => new
            {
                user_id = u.user_id,
                user_name = u.user_name,
                user_email = u.user_email,
                user_role = u.user_role
            })
            .ToListAsync();

        return Ok(users);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _dbconnection.Users
            .FirstOrDefaultAsync(u => u.user_id == id);

        if (user == null)
        {
            return NotFound("User not found");
        }

        _dbconnection.Users.Remove(user);

        await _dbconnection.SaveChangesAsync();

        return Ok("User deleted successfully");
    }
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(
    int id,
    UpdateUserDto updatedUser)
    {
        var user = await _dbconnection.Users
            .FirstOrDefaultAsync(u => u.user_id == id);

        if (user == null)
        {
            return NotFound("User not found");
        }

        var emailExists = await _dbconnection.Users
            .AnyAsync(u =>
                u.user_email == updatedUser.user_email &&
                u.user_id != id
            );

        if (emailExists)
        {
            return BadRequest("Email already exists");
        }

        if (updatedUser.user_role != "Admin" &&
            updatedUser.user_role != "Teacher" &&
            updatedUser.user_role != "Student")
        {
            return BadRequest("Invalid role");
        }

        user.user_name = updatedUser.user_name;
        user.user_email = updatedUser.user_email;
        user.user_role = updatedUser.user_role;

        if (!string.IsNullOrWhiteSpace(updatedUser.user_password))
        {
            user.user_password =
                BCrypt.Net.BCrypt.HashPassword(
                    updatedUser.user_password
                );
        }

        await _dbconnection.SaveChangesAsync();

        return Ok(new
        {
            message = "User updated successfully"
        });
    }
}
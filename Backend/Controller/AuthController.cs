using Backend.Data;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controller;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _dbconnection;
    private readonly IConfiguration _configuration;

    public AuthController(ApplicationDbContext dbconnection,IConfiguration configuration)
    {
        _dbconnection = dbconnection;
         _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto login)
    {
        var user = await _dbconnection.Users
            .FirstOrDefaultAsync(u => u.user_email == login.Email);

        if (user == null)
        {
            return Unauthorized("Invalid email or password");
        }

        bool passwordValid = BCrypt.Net.BCrypt.Verify(
            login.Password,
            user.user_password
        );

        if (!passwordValid)
        {
            return Unauthorized("Invalid email or password");
        }

        var claims = new[]
        {
            new Claim(
                ClaimTypes.NameIdentifier,
                user.user_id.ToString()
            ),
            new Claim(
                ClaimTypes.Name,
                user.user_name
            ),

            new Claim(
                ClaimTypes.Role,
                user.user_role
            )
        };
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]!
            )
        );
        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer:   _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);


        return Ok(new
        {
            message = "Login successful",
            token = jwt
        });
    }
}
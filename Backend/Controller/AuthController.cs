using Backend.Data;
using Backend.DTOs;
using Backend.Models;
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

    public AuthController(
        ApplicationDbContext dbconnection,
        IConfiguration configuration)
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

        var sessionToken = Guid.NewGuid().ToString();

        var session = new Session
        {
            user_id = user.user_id,
            session_token = sessionToken,
            created_at = DateTime.UtcNow,
            expires_at = DateTime.UtcNow.AddHours(1),
            revoked = false
        };

        _dbconnection.Sessions.Add(session);
        await _dbconnection.SaveChangesAsync();

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
            ),

            new Claim(
                "session_id",
                sessionToken
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
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        var jwt = new JwtSecurityTokenHandler()
            .WriteToken(token);

        return Ok(new
        {
            message = "Login successful",
            token = jwt
        });
    }
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var authHeader = Request.Headers["Authorization"].FirstOrDefault();

        if (string.IsNullOrEmpty(authHeader))
        {
            return Unauthorized("Token notf ound");
        }

        var token = authHeader.Replace("Bearer ", "");

        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);

        var sessionId = jwtToken.Claims
            .FirstOrDefault(c => c.Type == "session_id")
            ?.Value;

        if (string.IsNullOrEmpty(sessionId))
        {
            return Unauthorized("Session not found");
        }

        var session = await _dbconnection.Sessions
            .FirstOrDefaultAsync(s => s.session_token == sessionId);

        if (session == null)
        {
            return Unauthorized("Session not found");
        }

        session.revoked = true;

        await _dbconnection.SaveChangesAsync();

        return Ok(new
        {
            message = "Logout successful"
        });
    }
}

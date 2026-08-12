
namespace Backend.DTOs;

public class UpdateUserDto
{
    public string user_name { get; set; } = "";
    public string user_email { get; set; } = "";
    public string? user_password { get; set; }
    public string user_role { get; set; } = "";
}
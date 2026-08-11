using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("sessions")]
public class Session
{
    [Key]
    public int session_id { get; set; }

    [Required]
    public int user_id { get; set; }

    [Required]
    public string session_token { get; set; } = string.Empty;

    [Required]
    public DateTime created_at { get; set; }

    [Required]
    public DateTime expires_at { get; set; }

    [Required]
    public bool revoked { get; set; } = false;
}
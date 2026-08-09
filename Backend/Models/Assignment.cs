using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("assignments")]
public class Assignment
{
    [Key]
    public int assignment_id { get; set; }

    [Required]
    public string assignment_course { get; set; } = string.Empty;

    public string assignment_details { get; set; } = string.Empty;

    [Required]
    public string assignment_deadline { get; set; } = string.Empty;

    public double assignment_mark { get; set; }

    public string assignment_status { get; set; } = "Draft";

    [Required]
    public string assignment_title { get; set; } = string.Empty;
}
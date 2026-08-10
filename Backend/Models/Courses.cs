using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("course")]
public class Courses
{
    [Key]
    public int course_id{get;set;}
    [Required]
    public string course_name{get;set;} = string.Empty;
}
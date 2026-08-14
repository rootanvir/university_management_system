using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;


[Table("assignments")]
public class Assignment
{

    [Key]
    public int assignment_id { get; set; }


    [Required]
    public string assignment_title { get; set; } = string.Empty;


    [Required]
    public string assignment_description { get; set; } = string.Empty;


    [Required]
    public DateTime assignment_deadline { get; set; }


    [Required]
    public int course_id { get; set; }


    [ForeignKey("course_id")]
    public Courses? Course { get; set; }



    [Required]
    public int teacher_id { get; set; }


    [ForeignKey("teacher_id")]
    public Users? Teacher { get; set; }



    // NEW FIELD
    [Required]
    public int total_mark { get; set; }

}
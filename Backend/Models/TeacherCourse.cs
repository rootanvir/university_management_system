using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("teacher_courses")]
public class TeacherCourse
{
    [Key]
    public int teacher_course_id { get; set; }

    [Required]
    public int teacher_id { get; set; }

    [Required]
    public int course_id { get; set; }
}
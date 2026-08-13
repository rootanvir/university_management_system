using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("student_courses")]
public class StudentCourse
{
    [Key]
    public int student_course_id { get; set; }

    public int student_id { get; set; }

    public int course_id { get; set; }
}
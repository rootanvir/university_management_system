using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("assignment_submissions")]
public class AssignmentSubmission
{
    [Key]
    public int submission_id { get; set; }


    [Required]
    public int assignment_id { get; set; }


    [ForeignKey("assignment_id")]
    public Assignment? Assignment { get; set; }



    [Required]
    public int student_id { get; set; }


    [ForeignKey("student_id")]
    public Users? Student { get; set; }



    public string file_name { get; set; } = string.Empty;


    public DateTime submitted_at { get; set; }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("marksheet")]
public class MarkSheet
{
    [Key]
    public int mark_id{get;set;}
    [Required]
    public string student_name{get;set;} = string.Empty;
    [Required]
    public string course_name{get;set;} = string.Empty;
    [Required]
    public string feedback{get;set;} = string.Empty;
    [Required]
    public double mark{get;set;} = 0.00 ;

}
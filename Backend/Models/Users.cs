using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("users")]
public class Users
{
    [Key]
    public int user_id{get;set;}
    [Required]
    public string user_name{get;set;} = string.Empty;
    [Required]
    public string user_role{get;set;} = string.Empty;
    [Required]
    public string user_email{get;set;} = string.Empty;
    [Required]
    public string user_password{get;set;} = string.Empty;
}
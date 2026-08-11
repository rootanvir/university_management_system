using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<Assignment> Assignments {get;set;}
    public DbSet<MarkSheet> MarkSheet {get;set;}
    public DbSet<Users> Users  {get;set;}
    public DbSet<Courses> Courses  {get;set;}
    public DbSet<Session> Sessions { get; set; }
    
}
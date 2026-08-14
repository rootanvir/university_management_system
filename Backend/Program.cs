using Backend.Data;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


Env.Load();
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddOpenApi();
var connectionString =
    $"Host={Environment.GetEnvironmentVariable("DB_HOST")};" +
    $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
    $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
    $"Username={Environment.GetEnvironmentVariable("DB_USERNAME")};" +
    $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString)
);



builder.Services.AddCors(options =>
{
    options.AddPolicy("NextJs", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


var jwtKey =
    Environment.GetEnvironmentVariable("JWT_KEY");

var jwtIssuer =
    Environment.GetEnvironmentVariable("JWT_ISSUER");

var jwtAudience =
    Environment.GetEnvironmentVariable("JWT_AUDIENCE");



builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme
    )
    .AddJwtBearer(options =>
    {

        options.TokenValidationParameters =
            new TokenValidationParameters
            {

                ValidateIssuer = true,

                ValidateAudience = true,

                ValidateLifetime = true,

                ValidateIssuerSigningKey = true,


                ValidIssuer = jwtIssuer,

                ValidAudience = jwtAudience,


                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            jwtKey!
                        )
                    )

            };

    });
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors("NextJs");

app.UseAuthentication();

app.UseAuthorization();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.MapControllers();
app.Run();
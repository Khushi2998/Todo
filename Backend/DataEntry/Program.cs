global using Microsoft.EntityFrameworkCore;
using DataEntry.CustomMiddleware;
using DataEntry.Data;
using DataEntry.Models;

namespace DataEntry
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // DB
            builder.Services.AddDbContext<TodoDbContext>(options =>
                options.UseMySql(
                    builder.Configuration.GetConnectionString("MySqlConnection"),
                    new MySqlServerVersion(new Version(8, 0, 2)),
                    mysqlOptions => mysqlOptions.CommandTimeout(180)
                ));

            // Services
            builder.Services.AddScoped<IToDoService, ToDoService>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReact", policy =>
                    policy.WithOrigins("http://localhost:5173") // Vite
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });

            var app = builder.Build();
            app.UseMiddleware < LoggingMiddleware>();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowReact");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}

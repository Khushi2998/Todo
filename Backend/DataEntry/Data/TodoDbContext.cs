using DataEntry.Models;

namespace DataEntry.Data
{
    public class TodoDbContext(DbContextOptions<TodoDbContext> options) : DbContext(options)
    {
        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}

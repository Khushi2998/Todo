
using DataEntry.Data;
using Microsoft.EntityFrameworkCore;

namespace DataEntry.Models
{
    public class ToDoService : IToDoService
    {
        private readonly TodoDbContext _context;

        public ToDoService(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<List<ToDoItem>> GetTasksAsync()
        {
            return await _context.ToDoItems.ToListAsync();
        }

        public async Task<ToDoItem?> GetTaskByIdAsync(int id)
        {
            return await _context.ToDoItems.FindAsync(id);
        }

        public async Task AddTaskAsync(ToDoItem newTask)
        {
            _context.ToDoItems.Add(newTask);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTaskAsync(int id, ToDoItem updatedTask)
        {
            var task = await _context.ToDoItems.FindAsync(id);
            if (task == null) return;

            task.Description = updatedTask.Description;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTaskAsync(int id)
        {
            var task = await _context.ToDoItems.FindAsync(id);
            if (task == null) return;

            _context.ToDoItems.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}

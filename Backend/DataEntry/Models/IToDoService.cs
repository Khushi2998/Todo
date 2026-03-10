namespace DataEntry.Models
{
    public interface IToDoService
    {
        Task<List<ToDoItem>> GetTasksAsync();
        Task<ToDoItem?> GetTaskByIdAsync(int id);
        Task AddTaskAsync(ToDoItem newTask);
        Task UpdateTaskAsync(int id, ToDoItem updatedTask);
        Task DeleteTaskAsync(int id);
    }
}


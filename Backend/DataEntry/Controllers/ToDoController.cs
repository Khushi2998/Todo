using DataEntry.Models;
using Microsoft.AspNetCore.Mvc;

namespace DataEntry.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoService _toDoService;

        public ToDoController(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ToDoItem>>> GetTasks()
        {
            return Ok(await _toDoService.GetTasksAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetTaskById(int id)
        {
            var task = await _toDoService.GetTaskByIdAsync(id);
            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult> AddTask(ToDoItem newTask)
        {
            await _toDoService.AddTaskAsync(newTask);
            return CreatedAtAction(nameof(GetTaskById), new { id = newTask.Id }, newTask);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, ToDoItem updatedTask)
        {
            if (id != updatedTask.Id)
                return BadRequest("ID mismatch");

            var existing = await _toDoService.GetTaskByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _toDoService.UpdateTaskAsync(id, updatedTask);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            var existing = await _toDoService.GetTaskByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _toDoService.DeleteTaskAsync(id);
            return NoContent();
        }
    }
}

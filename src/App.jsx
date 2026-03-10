import { useEffect, useState } from "react";
import api from "./api";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/todo");
        setTodos(res.data || []);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!todo.trim()) return;
    try {
      const res = await api.post("/todo", { description: todo, isCompleted: false });
      setTodos([...todos, res.data]);
      setTodo("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todo/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const todoItem = todos.find(t => t.id === id);
      if (!todoItem) return;

      const updatedItem = { id: todoItem.id, description: todoItem.description, isCompleted: !todoItem.isCompleted };
      await api.put(`/todo/${id}`, updatedItem);

      setTodos(todos.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    const newText = prompt("Edit todo:", todos.find(t => t.id === id)?.description);
    if (!newText) return;
    handleEditSave(id, newText);
  };

  const handleEditSave = async (id, updatedText) => {
    try {
      const todoItem = todos.find(t => t.id === id);
      if (!todoItem) return;

      const updatedItem = { id: todoItem.id, description: updatedText, isCompleted: todoItem.isCompleted };
      await api.put(`/todo/${id}`, updatedItem);

      setTodos(todos.map(t => t.id === id ? { ...t, description: updatedText } : t));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200 flex flex-col items-center p-6">
      <h1 className="text-5xl font-bold text-gray-800 mb-10">Todo App</h1>

      {/* Add Todo */}
      <div className="w-full max-w-xl flex gap-3 mb-8">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow"
        />
        <button
          onClick={handleAdd}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transform transition-transform shadow-lg font-bold
"
         
        >
          Add
        </button>
      </div>

      {/* Todos */}
      {todos.length === 0 ? (
        <p className="text-gray-700 text-lg">No todos yet. Add one above!</p>
      ) : (
        <ul className="w-full max-w-xl space-y-4">
          {todos.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggle(item.id)}
                  className="w-6 h-6 accent-purple-600"
                />
                <span className={`text-lg font-medium ${item.isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
                  {item.description}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="text-purple-600 hover:text-purple-800 font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-500 hover:text-gray-700 font-medium transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;



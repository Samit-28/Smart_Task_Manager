import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { API_URL } from "../api";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", due_date: "" });
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "todo", due_date: "" });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskData, setEditingTaskData] = useState({ title: "", description: "", status: "todo", due_date: "" });
  const [summary, setSummary] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [logoutMessage, setLogoutMessage] = useState("");
  const summaryRef = useRef(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  
  const handleLogout = () => {
    setLogoutMessage("You have been logged out successfully.");
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login");
    }, 1500); // wait 1.5 seconds before redirecting
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  const normalizeTasks = (tasks) => tasks.map((task) => ({ ...task, id: task._id || task.id }));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTasks(normalizeTasks(data));
      } catch (err) {
        console.error("Fetch tasks error:", err);
      }
    };
    fetchTasks();
  }, [token]);

  const handleInputChange = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value });
  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const clearFilters = () => setFilters({ status: "", due_date: "" });

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.due_date) return alert("Please enter Title and Due Date");
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      setTasks((prev) => [...prev, { ...data, id: data._id }]);
      setNewTask({ title: "", description: "", status: "todo", due_date: "" });
    } catch (err) {
      console.error("Create task error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (editingTaskId === id) setEditingTaskId(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdateStatus = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updated = { ...task, status: { todo: "in-progress", "in-progress": "done", done: "todo" }[task.status] };

    try {
      const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...data, id: data._id } : t)));
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskData({ ...task });
  };

  const cancelEditing = () => setEditingTaskId(null);
  const handleEditingChange = (e) => setEditingTaskData({ ...editingTaskData, [e.target.name]: e.target.value });

  const saveEditing = async () => {
    if (!editingTaskData.title || !editingTaskData.due_date) return alert("Please enter Title and Due Date");
    try {
      const res = await fetch(`${API_URL}/api/tasks/${editingTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingTaskData),
      });
      const data = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === editingTaskId ? { ...data, id: data._id } : t)));
      setEditingTaskId(null);
    } catch (err) {
      console.error("Save edit error:", err);
    }
  };

  const generateSummary = async () => {
    if (filteredTasks.length === 0) return alert("No tasks to summarize.");
    try {
      const res = await fetch(`${API_URL}/api/ai/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tasks: filteredTasks }),
      });
      const data = await res.json();
      setSummary(data.summary || JSON.stringify(data));
      setTimeout(() => summaryRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      console.error("Summary error:", err);
      alert("Error generating summary.");
    }
  };

  const clearSummary = () => {
    setSummary("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSort = () => setSortAsc(!sortAsc);

  const filteredTasks = tasks
    .filter(
      (task) =>
        (!filters.status || task.status === filters.status) &&
        (!filters.due_date || task.due_date.startsWith(filters.due_date))
    )
    .sort((a, b) => (sortAsc ? a.due_date.localeCompare(b.due_date) : b.due_date.localeCompare(a.due_date)));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-700 via-black to-gray-700 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
          <h1 className="text-3xl font-bold text-center sm:text-left">My Todo List</h1>
          {logoutMessage && ( <div className="bg-green-700 text-white px-4 py-2 rounded mt-4 text-center font-semibold">{logoutMessage}</div>)}
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-semibold text-sm w-full sm:w-auto">Logout</button>
        </div>
        {/* Create Task */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="title" placeholder="Task Title" value={newTask.title} onChange={handleInputChange} className="p-3 bg-gray-800 border border-gray-600 rounded-md placeholder-gray-400" />
          <input type="date" name="due_date" value={newTask.due_date} onChange={handleInputChange} className="p-3 bg-gray-800 border border-gray-600 rounded-md" />
          <textarea name="description" placeholder="Description" value={newTask.description} onChange={handleInputChange} className="md:col-span-2 p-3 bg-gray-800 border border-gray-600 rounded-md placeholder-gray-400" />
          <select name="status" value={newTask.status} onChange={handleInputChange} className="p-3 bg-gray-800 border border-gray-600 rounded-md">
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button onClick={handleCreateTask} className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:opacity-90 text-white p-3 rounded-full text-lg font-semibold mb-6">
          Add Task
        </button>

        {/* Filters + Summary + Sort */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 items-center">
          <select name="status" value={filters.status} onChange={handleFilterChange} className="bg-gray-800 p-2 rounded-md border border-gray-600">
            <option value="">All Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <input type="date" name="due_date" value={filters.due_date} onChange={handleFilterChange} className="bg-gray-800 p-2 rounded-md border border-gray-600" />
          <button onClick={clearFilters} className="bg-red-600 hover:bg-red-700 p-2 rounded-md text-white font-semibold">Clear Filters</button>
          <button onClick={generateSummary} className="bg-purple-600 hover:bg-purple-700 p-2 rounded-md text-white font-semibold">Show Summary</button>
          <button onClick={toggleSort} className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-md text-white font-semibold">
            Sort Date {sortAsc ? "▲" : "▼"}
          </button>
        </div>

        {/* Task List */}
        <TodoItem
          items={filteredTasks}
          onDeleteClick={handleDelete}
          onMarkClick={handleUpdateStatus}
          editingTaskId={editingTaskId}
          editingTaskData={editingTaskData}
          onStartEdit={startEditing}
          onCancelEdit={cancelEditing}
          onEditChange={handleEditingChange}
          onSaveEdit={saveEditing}
        />
        {/* Summary */}
        {summary && (
          <div ref={summaryRef} className="mt-8 p-4 sm:p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md text-gray-200 max-h-[90vh] overflow-y-auto w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <h2 className="text-lg sm:text-xl font-bold">Task Summary</h2>
              <button onClick={clearSummary} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-semibold text-xs sm:text-sm">Clear Summary</button>
              </div>
              <pre className="whitespace-pre-wrap break-words text-sm sm:text-base">{summary}</pre>
              </div>
            )}
      </div>
    </div>
  );
}
export default Todo;
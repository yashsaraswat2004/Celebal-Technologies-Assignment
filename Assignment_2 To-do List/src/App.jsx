import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import toast, { Toaster } from "react-hot-toast";

export default function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Local Storage me add  hojaega task jab bhi naya task aayegaa...!! 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // New task add krne ke lie...
  const addTask = (text) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false }
    ]);
    toast.success("Task added successfully!");
  };

  // Task completed ya active mark krne ke lie...
  const toggleTask = (id) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const completed = tasks.find(task => task.id === id)?.completed;
  toast.success(completed ? "Task marked as active!" : "Task completed!");
  };

  // Task delete krne ke lie...
  const deleteTask = (id) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
    toast("Task deleted", { icon: "🗑️" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-2">
       <Toaster
        position="top-center"
        toastOptions={{
          className: "text-sm font-semibold rounded-lg shadow-lg",
          style: { background: "#fff", color: "#3730a3" }
        }}
      />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-800">📝 My To-Do List</h1>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

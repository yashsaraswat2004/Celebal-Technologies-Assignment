export default function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className={`flex items-center justify-between px-4 py-3 rounded-lg shadow-sm
      ${task.completed ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"}
    `}>
      <span
        className={`flex-1 cursor-pointer select-none ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
        onClick={() => toggleTask(task.id)}
        title="Mark as complete"
      >
        {task.text}
      </span>
      <button
        className="ml-3 text-red-500 hover:text-red-700 transition"
        onClick={() => deleteTask(task.id)}
        title="Delete"
      >
        ✕
      </button>
    </li>
  );
}
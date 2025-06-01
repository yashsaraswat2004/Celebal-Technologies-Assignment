import TaskItem from "./TaskItem";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  if (!tasks.length)
    return (
      <div className="text-center text-gray-400 mt-8">
        <span className="block text-2xl mb-2">🎉</span>
        No tasks yet!
      </div>
    );
  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

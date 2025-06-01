import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a task.");
      return;
    }
    addTask(input.trim());
    setInput("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 transition"
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={e => {
          setInput(e.target.value);
          setError("");
        }}
        maxLength={60}
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition"
      >
        Add
      </button>
      {error && (
        <span className="text-red-500 text-xs absolute mt-12">{error}</span>
      )}
    </form>
  );
}

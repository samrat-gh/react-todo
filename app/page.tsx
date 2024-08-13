"use client";

import { useState } from "react";
import { Check, LayoutList, Plus, Trash } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleToggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="mt-[20%] flex items-center justify-center">
      <div className="mx-auto max-w-md rounded-md bg-gray-800 p-7 text-gray-100 shadow-md">
        <h1 className="mb-4 text-3xl font-bold">Todo List</h1>
        <div className="mb-4 flex items-center">
          <div className="rounded-l-xl bg-gray-700 p-2">
            <LayoutList size={20} className=" bg-gray-700" />
          </div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full rounded-r-xl bg-gray-700 p-2 pl-3 text-sm text-gray-100 focus:outline-none focus:ring-0 focus:ring-gray-400"
            placeholder="Add new todo"
          />
          <button
            onClick={handleAddTodo}
            className="ml-2 rounded-md bg-green-600 p-2 text-sm text-gray-100 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <Plus size={20} />
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2 flex items-center">
              <button
                onClick={() => handleToggleCompleted(todo.id)}
                className={`p-2 text-sm text-gray-100 ${
                  todo.completed ? "bg-green-600" : "bg-gray-700"
                } rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400`}
              >
                {todo.completed ? (
                  <Check size={20} />
                ) : (
                  <div className="h-5 w-5 rounded-md border border-gray-400" />
                )}
              </button>
              <span
                className={`ml-2 text-sm ${
                  todo.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-100"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="ml-auto rounded-md bg-red-600 p-2 text-sm text-gray-100 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <Trash size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;

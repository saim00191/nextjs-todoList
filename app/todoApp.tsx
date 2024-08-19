"use client";

import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { TodoListEventTypes } from "./types";
import { TodoItem } from "./types";

export default function TodoApp() {
  // State to track the current input value for the todo title
  const [todosTitle, setTodosTitle] = useState("");

  // State to track the list of todos
  const [todo, setTodos] = useState<TodoItem[]>([]);

  // Function to add a new todo to the list
  const addTodo = () => {
    // Prevent adding empty todos
    if (!todosTitle.trim()) return;

    // Create a new todo item
    const newTodo: TodoItem = {
      id: Date.now().toString(), // Generate a unique ID using current timestamp
      title: todosTitle, // Use the current input value as the title
      completed: false, // By default, the todo is not completed
    };

    // Add the new todo to the list and update the state
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    // Clear the input field after the todo is added
    setTodosTitle(""); // Reset the input field value
  };

  // Function to handle changes in the input field
  const inputOnChangeHandler = (e: TodoListEventTypes) => {
    setTodosTitle(e.target.value); // Update the state with the current input value
  };

  // Function to toggle the completion status of a todo
  const toggleCompletion = (id: string) => {
    // Update the specific todo by toggling its 'completed' status
    setTodos(
      todo.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Function to delete a todo by its ID
  const handleDelete = (id: string) => {
    // Remove the todo from the list by filtering it out
    setTodos(todo.filter((t) => t.id !== id));
  };

  // Function to handle keyboard events in the input field
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  };

  return (
    <div className="mx-auto max-w-[90%] md:max-w-[1320px] p-4">
      {/* Header */}
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center bg-[#e8e8e8] p-4 md:p-6 uppercase">
        Todo List
      </h1>

      {/* Input and Add Button */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-4">
        <input
          onChange={inputOnChangeHandler} // Handle input changes
          value={todosTitle} // Bind the input field to the state
          type="text"
          placeholder="Enter Todos..."
          onKeyDown={onKeyDown}
          className="font-semibold font-sans uppercase w-full md:w-[350px] h-10 border-2 p-3 border-gray-400 outline-none"
        />
        <button
          onClick={addTodo} // Add the todo when clicked
          className="w-full md:w-auto h-10 text-white bg-green-700 hover:bg-green-800 px-4 font-bold rounded-md"
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <ul className="flex flex-col gap-4  mt-4">
        {todo.map((item, index) => (
          <li
            key={item.id} // Ensure unique key for each todo
            className={`flex flex-col md:flex-row items-center  p-4 bg-gray-100 rounded-lg shadow-md ${
              item.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {/* Index and Checkbox */}
            <div className="flex items-center mb-2 md:mb-0">
              <span className="mr-2 md:mr-4 text-3xl">{index + 1}.</span>{" "}
              {/* Display index */}
              <input
                type="checkbox"
                className="mr-2 md:mr-4 px-8 mt-0 md:mt-2 uppercase cursor-pointer font-semibold text-3xl"
                checked={item.completed} // Checkbox reflects completion status
                onChange={() => toggleCompletion(item.id)} // Toggle completion when checkbox is clicked
              />
            </div>
            {/* Todo Title */}
            <span className="flex-1 text-center uppercase md:text-center font-semibold lg:text-center text-3xl">
              {item.title}
            </span>{" "}
            {/* Display todo title */}
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item.id)} // Delete the todo when clicked
              className="text-red-500 flex font-semibold text-3xl hover:-translate-y-3 duration-300 hover:text-red-700 mt-2 md:mt-0"
            >
              Delete{" "}
              <span className="mt-1">
                <MdDeleteForever />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

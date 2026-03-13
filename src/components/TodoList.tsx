"use client";
import { useState } from "react";

export default function TodoList() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = () => {
    if (text.trim() === "") return;
    setTodos([...todos, text]);
    setText("");
  };

  const handleDeleteTodo = (indexToRemove: number) => {
    const newTodos = todos.filter((_, index) => index !== indexToRemove);
    setTodos(newTodos);
  };

  return (
    <div className="mt-8">
      {/* 할 일 입력 영역 */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="오늘 할 일을 입력하세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-black placeholder-gray-500"
        />
        <button onClick={handleAddTodo} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          추가
        </button>
      </div>
      {/* 할 일 목록을 보여주는 영역 */}
      <ul className="space-y-3">
        {todos.map((todoItem, index) => (
          <li
            key={index}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-center text-black"
          >
            <span>{todoItem}</span>
            <button onClick={() => handleDeleteTodo(index)} className="text-red-500 hover:text-red-700 font-semibold text-sm">
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

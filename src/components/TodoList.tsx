"use client";
import { useEffect, useState } from "react";

// (중요 1) 이제 할 일은 단순 텍스트가 아니라 이런 형태(객체)라고 리액트에게 알려줍니다.
interface Todo {
  id: number;
  text: string;
  isCompleted: number; // SQLite는 boolean 대신 0(false), 1(true)을 씁니다.
}

export default function TodoList() {
  const [text, setText] = useState("");
  // (중요 2) 상태 지갑(useState)도 단순 문자열이 아닌 Todo 객체를 담는 배열로 바꿉니다!
  const [todos, setTodos] = useState<Todo[]>([]);

  // 화면 켜질 때 DB에서 데이터 전부 가져오기 (Read)
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // "추가" 버튼 눌렀을 때 DB에 저장하기 (Create)
  const handleAddTodo = async () => {
    if (text.trim() === "") return;

    // 1. 서버(DB)에 텍스트를 보내서 저장해 달라고 요청합니다.
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }), 
    });
    
    // 2. 서버가 "저장 성공! 방금 저장한 번호표(id)는 이거야" 라고 답변을 줍니다.
    const data = await res.json();

    // 3. 굳이 서버에서 전체 목록을 다시 안 불러와도, 화면(리액트)에 새 객체를 스윽 끼워넣어줍니다!
    const newTodo: Todo = { id: data.id, text, isCompleted: 0 };
    setTodos([...todos, newTodo]);
    
    // 4. 입력창 비우기
    setText("");
  };

  const handleDeleteTodo = (indexToRemove: number) => {
    // (이 부분은 다음 미션에서 진짜 DB 삭제로 바꿀 예정입니다!)
    alert("아직 화면에서만 지워지고 DB에서는 안 지워져요!");
    const newTodos = todos.filter((_, index) => index !== indexToRemove);
    setTodos(newTodos);
  };

  return (
    <div className="mt-8">
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
      <ul className="space-y-3">
        {/* (중요 3) 이제 todoItem은 단순 텍스트가 아니라 객체라서, 글씨를 꺼내려면 '.text' 를 붙여야 합니다! */}
        {todos.map((todoItem, index) => (
          <li
            key={todoItem.id} // 리액트는 이런 고유 번호(id)를 key로 쓰는 걸 아주 좋아합니다!
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-center text-black"
          >
            <span>{todoItem.text}</span>
            <button onClick={() => handleDeleteTodo(index)} className="text-red-500 hover:text-red-700 font-semibold text-sm">
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

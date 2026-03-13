import Link from "next/link";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">나만의 첫 Next.js 프로젝트! 🎉</h1>
      <TodoList />

      <Link
        href="/about"
        className="inline-block mt-8 px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
      >
        👉 나에 대해 더 알아보기ㅇ
      </Link>
    </div>
  );
}

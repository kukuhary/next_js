import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="p-10 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">이 프로젝트를 만든 사람은...</h1>
      <p className="text-lg text-gray-700 mb-8">
        안녕하세요! Next.js를 처음 배우며 놀라운 속도로 성장 중인 개발자입니다. 🚀
      </p>

      {/* 다시 홈페이지로 돌아가는 아주 빠른 마법의 버튼 */}
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
      >
        🏠 To-Do List로 돌아가기
      </Link>
    </div>
  );
}

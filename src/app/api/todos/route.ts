import { NextResponse } from "next/server";
import { getDb } from "@/lib/db"; // 우리가 방금 만든 DB 연결 함수 불러오기!

// 클라이언트가 데이터를 요청할 때 (GET)
export async function GET() {
  const db = await getDb();
  
  // 데이터베이스의 todos 테이블에서 모든 데이터를 가져옵니다. (Read)
  const todos = await db.all("SELECT * FROM todos");
  
  return NextResponse.json(todos);
}

// 클라이언트가 새로운 데이터를 보낼 때 (POST)
export async function POST(request: Request) {
  const body = await request.json();
  
  if (!body.text) {
    return NextResponse.json({ error: "텍스트가 필요합니다." }, { status: 400 });
  }

  const db = await getDb();
  
  // 데이터베이스에 새로운 할 일을 직접 집어넣습니다! (Create)
  const result = await db.run(
    "INSERT INTO todos (text, isCompleted) VALUES (?, ?)",
    [body.text, 0] // 0은 false(완료 안 됨)를 의미합니다.
  );

  // 방금 추가된 데이터의 고유 ID와 함께 성공 메시지를 보냅니다.
  return NextResponse.json({ 
    message: "성공적으로 추가되었습니다.", 
    id: result.lastID 
  });
}

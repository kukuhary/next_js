import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

// DB 연결 객체를 스크립트 전역에 보관할 변수입니다.
let db: Database | null = null;

export async function getDb() {
  // 이미 연결되어 있다면 기존 연결을 그대로 씁니다.
  if (db) return db;

  // 프로젝트 최경로에 'todos.db' 라는 파일을 생성/연결합니다.
  const dbPath = path.resolve(process.cwd(), "todos.db");

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // 'todos' 테이블이 없으면 만들어줍니다. (최초 1회 실행)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      isCompleted BOOLEAN DEFAULT 0
    )
  `);

  return db;
}

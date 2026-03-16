# SQLite Integration for Todo App (CRUD)

데이터를 서버의 메모리 배열이 아닌, 실제 **SQLite 데이터베이스**에 저장하고 읽고 수정하고 삭제(CRUD)하는 기능을 구현합니다.
Next.js API 라우트를 활용하여 클라이언트와 DB 사이의 통신을 구축합니다.

## User Review Required
SQLite는 가볍고 파일 기반으로 작동하여 실습용으로 완벽합니다!
`sqlite` 와 `sqlite3` 라이브러리를 설치하여 작업을 진행합니다. 괜찮으신가요?

## Proposed Changes

### Database Setup
#### [NEW] [db.ts](file:///c:/antGra/next_js/src/lib/db.ts)
- SQLite 데이터베이스와 연결하고, 서버가 시작될 때 `todos` 테이블이 없으면 생성하는 초기화 코드를 작성합니다.
- 테이블 스키마: `id` (INTEGER PRIMARY KEY), `text` (TEXT), `isCompleted` (BOOLEAN).

### API Routes
#### [MODIFY] [route.ts](file:///c:/antGra/next_js/src/app/api/todos/route.ts)
- 기존의 온메모리 배열 `let todos = []` 을 삭제합니다.
- `GET`: 데이터베이스에서 모든 할 일 목록을 가져와 반환하도록 수정합니다. (Read)
- `POST`: 클라이언트로부터 텍스트를 받아 데이터베이스에 새로운 할 일을 `INSERT` 하도록 수정합니다. (Create)

#### [NEW] [route.ts (단일 아이템용)](file:///c:/antGra/next_js/src/app/api/todos/[id]/route.ts)
- `PUT` (또는 `PATCH`): 특정 `id`의 할 일을 찾아 텍스트를 수정하거나 완료 여부(`isCompleted`)를 토글합니다. (Update)
- `DELETE`: 특정 `id`의 할 일을 데이터베이스에서 삭제합니다. (Delete)

### Frontend Components
#### [MODIFY] [TodoList.tsx](file:///c:/antGra/next_js/src/components/TodoList.tsx)
- 기존의 단순 `string[]` 타입의 할 일 목록을 `{ id: number; text: string; isCompleted: boolean }[]` 객체 배열 형태로 업그레이드합니다.
- 삭제 버튼 클릭 시, 기존 배열 내 처리 대신 `DELETE /api/todos/[id]` API를 호출합니다.
- 추가 버튼 클릭 시, 이전처럼 `POST /api/todos` API를 호출하지만 새로고침 없이 즉각 목록을 업데이트 하도록 상태 로직을 꼼꼼히 구성합니다.
- (옵션) 할 일 텍스트를 클릭했을 때 취소선이 그어지는 완료 처리(Update) UI와 `PUT` API 호출 로직을 추가합니다.

## Verification Plan

### Automated Tests
- 없음 (본 실습에서는 빠른 진행을 위해 수동 테스트 위주로 진행합니다.)

### Manual Verification
1. `npm run dev` 실행 후 `http://localhost:3000` 접속.
2. 새로운 할 일 추가 코드를 작성한 뒤 "추가" 클릭 -> 리스트에 정상 표시 (Create & Read).
3. 새로고침을 해도 데이터가 남는지 확인 (DB 영구 저장 확인).
4. "삭제" 버튼 클릭 시 항목이 지워지고 새로고침해도 안개 나타나는지 확인 (Delete).
5. 할 일 텍스트 클릭 시 취소선이 생기며, 새로고침해도 유지되는지 확인 (Update).

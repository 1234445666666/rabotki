import { useAuth } from "../app/auth/AuthContext";

type Course = {
  id: number;
  title: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "React для начинающих",
  },
  {
    id: 2,
    title: "TypeScript в действии",
  },
  {
    id: 3,
    title: "Backend на Node.js",
  },
  {
    id: 4,
    title: "Git и командная работа",
  },
];

export function Courses() {
  const { user } = useAuth();

  return (
    <div>
      <h1>список курсов</h1>

      <p>Добро пожаловать, {user?.name}! Вот доступные курсы:</p>

      <div style={{ display: "grid", gap: "20px" }}>
        {courses.map((course) => (
          <div
            key={course.id}
            style={{ border: "1px solid #ccc", padding: "16px" }}
          >
            <h3>{course.title}</h3>
          </div>
        ))}
      </div>

      {user?.role === "student" && <div>Вы студент</div>}

      {(user?.role === "teacher" || user?.role === "admin") && (
        <div>
          {user?.role === "admin" ? "администратор" : "преподаватель"}.
          <a href="/courses/manage">Перейти к управлению курсами</a>
        </div>
      )}
    </div>
  );
}

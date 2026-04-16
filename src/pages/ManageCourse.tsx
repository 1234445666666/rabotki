import { useState } from "react";
import { useAuth } from "../app/auth/AuthContext";

type Course = {
  id: number;
  title: string;
};

const initialCourses: Course[] = [
  { id: 1, title: "React для начинающих" },
  { id: 2, title: "TypeScript в действии" },
  { id: 3, title: "Backend на Node.js" },
  { id: 4, title: "Git и командная работа" },
];

export function ManageCourse() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`удалить курс "${title}"?`)) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  return (
    <div>
      <h1>Управление курсами</h1>
      <p>Добро пожаловать, {user?.name}!</p>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <button onClick={() => handleDelete(course.id, course.title)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

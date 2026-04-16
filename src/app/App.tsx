import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/header";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { ManageCourse } from "../pages/ManageCourse";
import { Courses } from "../pages/Courses";
import Admin from "../pages/Admin";

function NotFoundPage() {
  return (
    <div style={{ padding: "0 16px" }}>
      <h1>404</h1>
      <p>Страница не найдена.</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "16px" }}>
        <Routes>
          {/* Публичные маршруты -- доступны всем */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Защищённый маршрут -- ProfilePage обёрнута в ProtectedRoute.
              Если пользователя нет -- ProtectedRoute перенаправит на /login,
              и ProfilePage вообще не будет рендериться. */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/manage"
            element={
              <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                <ManageCourse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Все остальные адреса */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

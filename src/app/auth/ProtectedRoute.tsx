import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { type UserRole } from "./AuthContext";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) {
  const { user, authChecked } = useAuth();

  // Состояние 1: проверка ещё не завершена
  if (!authChecked) {
    return <p>Проверка авторизации...</p>;
  }

  // Состояние 2: проверка завершена, пользователя нет
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Редирект на главную (пользователь авторизован, но прав недостаточно)
    return <Navigate to="/" replace />;
  }

  // Состояние 3: пользователь авторизован и имеет нужные права
  return <>{children}</>;
}

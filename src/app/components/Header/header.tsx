import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export function Header() {
  // Одна строка -- и у нас есть всё что нужно для шапки
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <nav style={{ display: "flex", gap: "16px" }}>
        <Link to="/">Главная</Link>
        <Link to="/profile">Профиль</Link>
      </nav>

      <div>
        {/* Показываем разный интерфейс в зависимости от состояния */}
        {user ? (
          // Пользователь вошёл -- показываем имя, роль и кнопку выхода
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span>
              {user.name} <strong>({user.role})</strong>
            </span>
            <button onClick={logout}>Выйти</button>
          </div>
        ) : (
          // Пользователя нет -- предлагаем войти
          <Link to="/login">Войти</Link>
        )}
      </div>
    </header>
  );
}

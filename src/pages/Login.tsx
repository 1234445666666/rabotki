import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../app/auth/AuthContext";

export function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Контролируемые поля формы
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Если пользователь уже авторизован и зачем-то зашёл на /login --
  // сразу перенаправляем его на профиль. Незачем показывать форму входа
  // тому, кто уже вошёл.
  if (user) {
    return <Navigate to="/profile" replace />;
  }

  function handleSubmit(event: React.FormEvent) {
    // Отменяем стандартное поведение формы -- перезагрузку страницы
    event.preventDefault();

    const result = login(email, password);

    if (result.success) {
      // Вход успешен -- убираем ошибку и переходим на профиль
      setErrorMessage("");
      navigate("/profile", { replace: true });
      return;
    }

    // Вход не удался -- показываем сообщение об ошибке
    setErrorMessage(result.message ?? "Ошибка входа");
  }

  return (
    <div style={{ maxWidth: "360px", margin: "40px auto", padding: "0 16px" }}>
      <h1>Вход</h1>

      <p style={{ color: "#888", marginBottom: "4px" }}>Тестовые аккаунты:</p>
      <ul style={{ color: "#888", marginBottom: "24px" }}>
        <li>admin@test.com / 1234</li>
        <li>user@test.com / 1234</li>
        <li>teacher@test.com / 1234</li>
        <li>student@test.com / 1234</li>
      </ul>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
            style={{
              display: "block",
              width: "100%",
              marginTop: "4px",
              padding: "8px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            style={{
              display: "block",
              width: "100%",
              marginTop: "4px",
              padding: "8px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Войти
        </button>

        {errorMessage && (
          <p style={{ color: "red", margin: 0 }}>{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

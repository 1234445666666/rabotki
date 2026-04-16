import { useAuth } from "../app/auth/AuthContext";
import { Link } from "react-router-dom";
export function Profile() {
  const { user } = useAuth();

  // Эта страница рендерится только внутри ProtectedRoute,
  // который уже проверил, что пользователь есть.
  // Но TypeScript не знает об этом -- для него user всё равно User | null.
  // Добавляем проверку, чтобы успокоить TypeScript и подстраховаться.
  if (!user) return null;

  return (
    <div style={{ padding: "0 16px" }}>
      <h1>Профиль</h1>
      <table style={{ borderCollapse: "collapse", marginTop: "16px" }}>
        <tbody>
          {(
            [
              ["ID", user.id],
              ["Имя", user.name],
              ["Email", user.email],
              ["Роль", user.role],
            ] as [string, string | number][]
          ).map(([label, value]) => (
            <tr key={label}>
              <td
                style={{
                  padding: "8px 24px 8px 0",
                  fontWeight: "bold",
                  color: "#555",
                  verticalAlign: "top",
                }}
              >
                {label}
              </td>
              <td style={{ padding: "8px 0" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/courses">на курсы</Link>
    </div>
  );
}

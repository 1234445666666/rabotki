import { Outlet, NavLink, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>header</header>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#007bff" : "white",
            fontWeight: isActive ? "bold" : "normal",
            borderBottom: isActive ? "2px solid #007bff" : "none",
          })}
        >
          Главная
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => ({
            color: isActive ? "#007bff" : "white",
            fontWeight: isActive ? "bold" : "normal",
            borderBottom: isActive ? "2px solid #007bff" : "none",
          })}
        >
          О нас
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            color: isActive ? "#007bff" : "white",
            fontWeight: isActive ? "bold" : "normal",
            borderBottom: isActive ? "2px solid #007bff" : "none",
          })}
        >
          Профиль
        </NavLink>
      </nav>
      <main>
        <Outlet />
        <h3>Пользователи</h3>
        <Link to="/user/1">Пользователь 1</Link>
        <br />
        <Link to="/user/2">Пользователь 2</Link>
        <br />
        <Link to="/user/3">Пользователь 3</Link>
        <br />
      </main>
      <footer>footer</footer>
    </div>
  );
}

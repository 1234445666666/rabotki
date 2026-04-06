import { replace, useNavigate } from "react-router-dom";
export default function Login(params) {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/profile", { replace: true });
  }
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

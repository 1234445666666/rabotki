import { useState } from "react";
import withLoader from "./hoc";

function User({ name }: { name: string }) {
  return <h1>Профиль пользователя: {name}</h1>;
}

const UserHOC = withLoader(User);

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <button onClick={() => setLoading(!loading)}>
        {loading ? "Загрузить профиль" : "Сбросить загрузку"}
      </button>

      <UserHOC isLoading={loading} name="test" />
    </div>
  );
}

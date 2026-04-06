import { useParams } from "react-router-dom";
export default function User() {
  const params = useParams();

  const numberID = Number(params.id);

  if (!params.id || isNaN(numberID)) {
    return (
      <div>
        <h2>Пользователь не найден или не число</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>User {params.id}</h1>
    </div>
  );
}

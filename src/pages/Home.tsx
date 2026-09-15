import { useState } from "react";

export function Home() {
  const [name, setName] = useState("");
  console.log(name);
  return (
    <div style={{ padding: "0 16px" }}>
      <h1>Главная страница</h1>
      <p>Напишите имя github</p>
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../hooks/useDebounce";

type User = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

type SearchResult = {
  items: User[];
};

// Функция запроса — просто fetch и проверка ошибки
async function searchUsers(query: string): Promise<SearchResult> {
  const res = await fetch(`https://api.github.com/search/users?q=${query}`);
  if (!res.ok) throw new Error("Ошибка загрузки");
  return res.json();
}

export function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    enabled: debouncedQuery.length > 0, // не ищем пустую строку
  });

  const isTyping = query !== debouncedQuery;

  return (
    <div>
      <h1>Поиск пользователей GitHub</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите имя..."
      />

      {isTyping && <p>Печатаете...</p>}
      {isLoading && <p>Загрузка...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>Ошибка: {error.message}</p>
          <button onClick={() => refetch()}>Повторить</button>
        </div>
      )}

      {data && data.items.length === 0 && <p>Ничего не найдено</p>}

      {data && data.items.length > 0 && (
        <ul>
          {data.items.map((user) => (
            <li key={user.id}>
              <img
                src={user.avatar_url}
                width={40}
                height={40}
                alt={user.login}
              />
              <Link to={`/users/${user.login}`}>{user.login}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

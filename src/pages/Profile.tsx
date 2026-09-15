import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type UserDetail = {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  html_url: string;
};

type Repo = {
  id: number;
  name: string;
  stargazers_count: number;
  language: string | null;
  html_url: string;
};

// Запрос профиля
async function fetchUser(login: string): Promise<UserDetail> {
  const res = await fetch(`https://api.github.com/users/${login}`);
  if (res.status === 404) throw new Error("Пользователь не найден");
  if (!res.ok) throw new Error("Ошибка загрузки");
  return res.json();
}

// Запрос репозиториев
async function fetchRepos(login: string): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${login}/repos?per_page=100`,
  );
  if (!res.ok) throw new Error("Ошибка загрузки репозиториев");
  return res.json();
}

export function UserProfilePage() {
  const { login } = useParams();

  const userQuery = useQuery({
    queryKey: ["user", login],
    queryFn: () => fetchUser(login!),
    enabled: Boolean(login),
  });

  const reposQuery = useQuery({
    queryKey: ["repos", login],
    queryFn: () => fetchRepos(login!),
    enabled: Boolean(login) && Boolean(userQuery.data), // ждём профиль
  });

  if (userQuery.isLoading) return <p>Загрузка...</p>;

  if (userQuery.error) {
    return (
      <div>
        <p style={{ color: "red" }}>{userQuery.error.message}</p>
        <button onClick={() => userQuery.refetch()}>Повторить</button>
        <br />
        <Link to="/search">← Назад</Link>
      </div>
    );
  }

  const user = userQuery.data;
  if (!user) return null;

  // Топ-5 по звёздам — сортируем сами, GitHub так не умеет
  const topRepos = reposQuery.data
    ? [...reposQuery.data]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
    : [];

  return (
    <div>
      <Link to="/search">← Назад</Link>

      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
        <img src={user.avatar_url} width={80} height={80} alt={user.login} />
        <div>
          <h1>{user.name ?? user.login}</h1>
          <p>@{user.login}</p>
          <p>
            Репозиториев: {user.public_repos} · Фолловеров: {user.followers}
          </p>
        </div>
      </div>

      <h2>Топ-5 репозиториев</h2>

      {reposQuery.isLoading && <p>Загрузка репозиториев...</p>}
      {reposQuery.error && (
        <p style={{ color: "red" }}>{reposQuery.error.message}</p>
      )}

      {topRepos.length === 0 && !reposQuery.isLoading && (
        <p>Репозиториев нет</p>
      )}

      <ul>
        {topRepos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>{" "}
            — ★ {repo.stargazers_count} {repo.language && `(${repo.language})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

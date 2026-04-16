import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Роль пользователя -- строго два варианта
export type UserRole = "user" | "admin" | "teacher" | "student";

// Объект пользователя
export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  group?: string;
};

// То, что контекст будет предоставлять компонентам
type AuthContextType = {
  user: User | null; // текущий пользователь или null
  authChecked: boolean; // завершилась ли проверка localStorage
  login: (
    email: string,
    password: string,
  ) => {
    success: boolean;
    message?: string;
  };
  logout: () => void;
};

// null -- начальное значение до того, как провайдер его установит
const AuthContext = createContext<AuthContextType | null>(null);

// Ключ для localStorage -- выносим в константу,
// чтобы не писать строку вручную в нескольких местах
const STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed: User = JSON.parse(raw);
        setUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setAuthChecked(true);
  }, []);

  function login(email: string, password: string) {
    if (!email.trim() || !password.trim()) {
      return { success: false, message: "Заполните все поля" };
    }

    const accoun = [
      {
        email: "admin@test.com",
        password: "1234",
        id: 1,
        name: "Администратор",
        role: "admin" as UserRole,
      },
      {
        email: "user@test.com",
        password: "1234",
        id: 2,
        name: "Пользователь",
        role: "user" as UserRole,
      },

      {
        email: "teacher@test.com",
        password: "1234",
        id: 3,
        name: "Учитель",
        role: "teacher" as UserRole,
      },
      {
        email: "student@test.com",
        password: "1234",
        id: 4,
        name: "Ученик",
        role: "student" as UserRole,
        group: "ИС",
      },
    ];

    const match = accoun.find(
      (a) => a.email === email && a.password === password,
    );

    if (!match) {
      return { success: false, message: "Неверный email или пароль" };
    }

    const loggedUser: User = {
      id: match.id,
      name: match.name,
      email: match.email,
      role: match.role,
    };

    setUser(loggedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));

    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo(
    () => ({ user, authChecked, login, logout }),
    [user, authChecked],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
}

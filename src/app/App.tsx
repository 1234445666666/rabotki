import { Navigate, Route, Routes } from "react-router-dom";
import { SearchPage } from "../pages/SearchPage";
import { UserProfilePage } from "../pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/search" />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/users/:login" element={<UserProfilePage />} />
    </Routes>
  );
}

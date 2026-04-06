import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../page/Home";
import About from "../page/About";
import Profile from "../page/Profile";
import Error from "../page/Error";
import User from "../page/User";
import Layout from "./components/Layout/counter";
import Login from "../page/Login";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

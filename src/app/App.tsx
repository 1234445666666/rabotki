import Counter from "./components/Counter/counter";
import Form from "./components/Form/form";
import Scroll from "./components/Scroll/scroll";
import { useState } from "react";
import Modal from "./components/Modal/modal";
import "./App.css";
import Test from "./components/HOC/test";
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Counter />
      <Form />
      <Scroll />
      <div>
        <button onClick={() => setIsOpen(true)}>Открыть модалку</button>

        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <h2>Модальное окно</h2>
            <p>Это содержимое модалки</p>
            <button onClick={() => setIsOpen(false)}>Закрыть</button>
          </Modal>
        )}
      </div>
      <Test />
    </div>
  );
}

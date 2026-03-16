import { createPortal } from "react-dom";
import "./modal.css";

export default function Modal({ children, onClose }) {
  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}

import { useRef } from "react";

export default function Scroll() {
  const targetRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <button onClick={handleScroll}>Перейти к блоку</button>

      <div style={{ height: "10000px" }} />

      <div ref={targetRef}>Целевой блок</div>
    </div>
  );
}

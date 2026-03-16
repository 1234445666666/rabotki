import { useState, useRef } from "react";
export default function Form() {
  const [text, setText] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
    console.log(text);
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Форма не отправилась стандартным способом");
    console.log(event.target, "target");
    console.log(event.currentTarget, "currentTarget");
  }

  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    inputRef.current?.focus();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" onChange={handleChange} />
        <button type="submit">Отправить</button>
      </form>
      <button onClick={handleFocus}>focus</button>
    </div>
  );
}

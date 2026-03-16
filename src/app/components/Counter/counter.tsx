import React, { Children, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  console.log("render");

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child />
    </div>
  );
}

const Child = React.memo(ChildrenFn);
function ChildrenFn() {
  console.log("children render");
  return (
    <div>
      <h1>children</h1>
    </div>
  );
}

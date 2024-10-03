import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = isMounted && (await fetch("http://localhost:8080/todos"));
      const data = isMounted && (await response.json());
      isMounted && console.log(data);
      isMounted && setTodos(data);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1>Todo:</h1>
      {todos.map((todo) => (
        <li key={todo._id}>{todo.text}</li>
      ))}
    </>
  );
}

export default App;

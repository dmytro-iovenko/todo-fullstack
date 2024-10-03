import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

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

  function handleChange(e) {
    setInput(e.target.value);
  }

  async function handleSubmit(e) {
    // stop the default behavior of page refresh
    e.preventDefault();

    // format our data on the frontend to match the schema
    const todo = {
      text: input,
    };
    // make the request
    const response = await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    // format the new todo that now has the id and completed property
    const newTodo = await response.json();

    // keep the state in sync with our data
    setTodos([...todos, newTodo]);

    console.log(newTodo);
  }

  console.log(input);

  return (
    <>
      <h1>Todo:</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleChange}></input>
        <button>Add</button>
      </form>
    </>
  );
}

export default App;

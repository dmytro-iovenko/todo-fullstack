import { useEffect, useState } from "react";

export const BASE_URL = "http://localhost:8080"

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = isMounted && (await fetch(`${BASE_URL}/todos`));
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
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    // format the new todo that now has the id and completed property
    const newTodo = await response.json();

    // keep the state in sync with our data
    setTodos([...todos, newTodo]);

    // reset the input to an empty string (easier to add todos that way)
    setInput("");

    console.log(newTodo);
  }

  // the id is the _id of the todo document we want to delete
  async function handleDelete(id) {
    // make the request with the document id in the path (at the end)
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });

    // format the deleted todo
    const deletedTodo = await response.json();

    // make a copy of the state but also remove the document with the mathcing id
    const updatedTodos = todos.filter((todo) => todo._id !== deletedTodo._id);

    // update the state with a new array
    setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Todo:</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>X</button>
          </li>
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

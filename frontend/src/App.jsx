import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function test() {
      const response = await fetch("http://localhost:8080/test");
      const data = await response.json();
      console.log(data);
    }
    test();
  }, []);
  return <></>;
}

export default App;

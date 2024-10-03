import { useEffect } from "react";

function App() {
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = isMounted && await fetch("http://localhost:8080/test");
      const data = isMounted && await response.json();
      isMounted && console.log(data);
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  return <></>;
}

export default App;

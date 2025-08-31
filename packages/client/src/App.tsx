import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1 className="font-bold">{message}</h1>
      <Button>Click me</Button>
    </div>
  );
}

export default App;

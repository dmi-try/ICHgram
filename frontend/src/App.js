import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(`${url}/`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data from server:", error);
      });
  }, []);
  return (
    <>
      <h2>Connection test</h2>
      <p>{response}</p>
    </>
  );
}

export default App;

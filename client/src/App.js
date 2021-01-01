import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("NOTIFICATION", data => {
      setResponse(data);
      console.log("Connected To Server")
    })
  }, []);

  return (
    <p>
      {"This is server response" + response}
      {/* It's <time dateTime={response}>{response}</time> */}
    </p>
  );
}
export default App;

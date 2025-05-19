import React, { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const runCode = async () => {
    setOutput("");
    setError("");

    try {
      const response = await fetch("https://code-editor-app-2.onrender.com/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, input }),
      });

      const data = await response.json();
      setOutput(data.output);
      setError(data.error);
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="App">
      <h1>Python Code Runner</h1>
      <textarea
        placeholder="Enter Python code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="80"
      />
      <br />
      <textarea
        placeholder="Optional Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="3"
        cols="80"
      />
      <br />
      <button onClick={runCode}>Run Code</button>
      <h2>Output:</h2>
      <pre>{output}</pre>
      {error && (
        <>
          <h2 style={{ color: "red" }}>Error:</h2>
          <pre style={{ color: "red" }}>{error}</pre>
        </>
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [code, setCode] = useState("# Enter Python code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    const res = await fetch("https://code-editor-app-h0gi.onrender.com/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, input }),
    });

    const data = await res.json();
    setOutput(data.output || data.error);
  };

  return (
    <div className="container">
      <h1>CodePlayground - Python</h1>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <h3>User Input:</h3>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={runCode}>Run</button>
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}

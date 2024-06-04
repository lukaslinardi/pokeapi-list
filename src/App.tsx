//import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import PokeList from "../src/components/PokeList";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/poke-list" />} />
        <Route path="/poke-list" element={<PokeList />} />
        {/*
<div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 rounded-md p-3 font-bold text-white"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

          */}{" "}
      </Routes>
    </div>
  );
}

export default App;

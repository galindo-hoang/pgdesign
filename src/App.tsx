// src/App.tsx
import React from "react";
import "./App.css"; // General app styles, if any
import HomePage from "./pages/homePage/HomePage";

const App: React.FC = () => {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
};

export default App;

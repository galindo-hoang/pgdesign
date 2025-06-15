// src/App.tsx
import React from "react";
import "./App.css"; // General app styles, if any
import IntroPage from "./pages/introPage/IntroPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <IntroPage />
    </div>
  );
};

export default App;

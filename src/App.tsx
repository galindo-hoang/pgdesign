// src/App.tsx
import React from "react";
import Header from "./components/Headerbar/Header";
import "./App.css"; // General app styles, if any

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      {/* Your other page content */}
      <main style={{ paddingTop: "80px" }}>
        {" "}
        {/* Adjust padding to account for fixed header height */}
        <h1>Welcome to my app!</h1>
        <p>This is some content below the header.</p>
      </main>
    </div>
  );
};

export default App;

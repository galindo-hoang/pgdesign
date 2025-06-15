// src/App.tsx
import React from "react";
import "./App.css"; // General app styles, if any
import IntroPage from "./pages/introPage/IntroPage";
import ContactPage from "./pages/contactPage/ContactPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <ContactPage />
    </div>
  );
};

export default App;

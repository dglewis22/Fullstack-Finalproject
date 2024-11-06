import ReactDOM from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './style.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); // Log out user and redirect
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={isLoggedIn ? <Home handleLogout={handleLogout} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="*" element={<NoPage />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// Render the app into the root element of your HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

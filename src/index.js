import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/layouts/Home";
import './index.css'
// import Index from './components/layouts/Index.jsx'
// import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

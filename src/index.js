import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserTable from "./components/userTable";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserTable />
  </React.StrictMode>
);

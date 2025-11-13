import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Hospital Schedule Management</h1>
      <p>Choose an option:</p>
      <Link to="/employees">
        <button>Manage Employees</button>
      </Link>
    </div>
  );
}

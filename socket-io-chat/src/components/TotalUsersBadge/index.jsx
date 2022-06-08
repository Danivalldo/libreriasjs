import React from "react";
import "./totalusers-badge.scss";

const TotalUsersBadge = ({ totalUsers }) => {
  return (
    <div className="total-users-badge-container">
      <span className="label">Usuarios conectados:</span>{" "}
      <span className="number">{totalUsers}</span>
    </div>
  );
};

export default TotalUsersBadge;

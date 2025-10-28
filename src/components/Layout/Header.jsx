import React from "react";

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="app-title">
          <span className="app-icon">🌊</span>
          CABA - Cảnh báo lũ lụt
        </h1>
        <p className="app-subtitle">
          Hệ thống cảnh báo lũ lụt dựa trên cộng đồng
        </p>
      </div>
    </header>
  );
}

export default Header;

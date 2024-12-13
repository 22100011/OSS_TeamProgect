import React from "react";
import { Link } from "react-router-dom";
import DataPage from "../components/dataPage";

const Add = () => {
  return (
  <>
    <header className="header">
      <h3 className="header-title">
        <Link to="/main" className="header-link">Global Hunger Index Analysis System</Link>
      </h3>

      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/map" className="nav-link">Map Page</a>
          </li>
          <li className="nav-item">
            <Link to="/data" className="nav-link">Data Page</Link>
          </li>
        </ul>
      </nav>
    </header>
    <DataPage/>
  </>
  );
};

export default Add;
import React from "react";
import { Link } from "react-router-dom";
import CRUDPage from "../components/crudPage";

const Add = () => {
  return (
    <>
      <header className="header">
        {/* 이름을 누르면 main 페이지로 이동 */}
        <h3 className="header-title">
          <a href="/main" className="header-link">
            Global Hunger Index Analysis System
          </a>
        </h3>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/map" className="nav-link">Map Page</Link>
            </li>
            <li className="nav-item">
              <Link to="/data" className="nav-link">Data Page</Link>
            </li>
          </ul>
        </nav>
      </header>
      <CRUDPage/>
    </>
    
  );
};

export default Add;


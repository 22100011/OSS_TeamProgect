import React from "react";
import { Link } from "react-router-dom";
import DataPage from "../components/dataPage";
import "./dats.css"; // CSS 파일 import

const Add = () => {
  return (
  <>
    <header>
      <h1>Global Hunger Index Analysis System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/main">
              <button type="button" class="button_data">Main Page</button>
            </Link>
          </li>
          <li>
            <Link to="/map">
              <button type="button" class="button_data">Map Page</button>
            </Link>
          </li>
          <li>
            <Link to="/recent">
              <button type="button" class="button_data">Recent Page</button>
            </Link>
          </li>
          <li>
            <Link to="/crud">
              <button type="button" class="button_data">CRUD Page</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    <DataPage/>
  </>

    
  );
};

export default Add;
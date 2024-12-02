import React from "react";
import { Link } from "react-router-dom";
import DataPage from "../components/dataPage";

const Add = () => {
  return (
    <div>
      <h1>Data Page</h1>
      <Link to="/main">
        <button>Main Page</button>
      </Link>
      <Link to="/map">
        <button>Map Page</button>
      </Link>
      <Link to="/recent">
        <button>Recent Page</button>
      </Link>
      <Link to="/crud">
        <button>CRUD Page</button>
      </Link>
      <DataPage/>
    </div>
    
  );
};

export default Add;
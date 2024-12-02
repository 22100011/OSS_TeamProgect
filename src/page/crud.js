import React from "react";
import { Link } from "react-router-dom";
import CRUDPage from "../components/crudPage";

const Add = () => {
  return (
    <div>
      <h1>CRUD Page</h1>
      <Link to="/data">
        <button>data Page</button>
      </Link>
      <CRUDPage/>
    </div>
    
  );
};

export default Add;
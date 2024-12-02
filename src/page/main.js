import React from "react";
import { Link } from "react-router-dom";

const Add = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/data">
        <button>Data Page</button>
      </Link>
      <Link to="/map">
        <button>Map Page</button>
      </Link>
      
    </div>

  );
};

export default Add;
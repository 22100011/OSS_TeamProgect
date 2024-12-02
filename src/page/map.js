import React from "react";
import { Link } from "react-router-dom";
import MapPage from "../components/mapPage";


const Add = () => {
  return (
    <div>
      <h1>Map Page</h1>
      <Link to="/main">
        <button>Main Page</button>
      </Link>
      <Link to="/data">
        <button>Data Page</button>
      </Link>
      <MapPage/>
    </div>
    
  );
};

export default Add;
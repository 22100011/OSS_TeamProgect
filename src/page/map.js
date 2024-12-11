import React from "react";
import { Link } from "react-router-dom";
import MapPage from "../components/mapPage";


const Add = () => {
  return (
    <div>
      <h2>Map Page</h2>
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
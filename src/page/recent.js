import React from "react";
import { Link } from "react-router-dom";
import ShowPage from "../components/recentPage";


const Add = () => {
  return (
    <div>
      <h1>Data Page</h1>
      <Link to="/data">
        <button>Data Page</button>
      </Link>
      <ShowPage/>
    </div>
    
  );
};

export default Add;
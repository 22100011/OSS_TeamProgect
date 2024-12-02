import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DataPage from './page/data';
import MainPage from './page/main';
import MapPage from './page/map';
import RecentPage from './page/recent';
import CRUDPage from './page/crud';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/recent" element={<RecentPage />}/>
          <Route path="/crud" element={<CRUDPage />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import '../css/recent.css'; // CSS 파일 불러오기

const App = () => {
  const [showRecentData, setshowRecentData] = useState({
    low: [],
    moderate: [],
    serious: [],
    alarming: [],
    extremelyAlarming: [],
  });

  // 데이터 가져오기 및 그룹화
  const getGHI = async () => {
    try {
      const response = await fetch('https://6743ce15b7464b1c2a65e803.mockapi.io/GHI');
      const data = await response.json();

      const dataForYear = data.filter((item) => item.year === 2023);

      const groupedData = {
        low: dataForYear.filter((item) => item.ghi < 10),
        moderate: dataForYear.filter((item) => item.ghi >= 10 && item.ghi < 20),
        serious: dataForYear.filter((item) => item.ghi >= 20 && item.ghi < 35),
        alarming: dataForYear.filter((item) => item.ghi >= 35 && item.ghi < 50),
        extremelyAlarming: dataForYear.filter((item) => item.ghi >= 50),
      };

      setshowRecentData(groupedData);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    getGHI();
  }, []);

  return (
    <div className="container">
      <div className="scoreHeade">2023년 기준 GHI SCORE</div>
      <div className="grid">
        <div className="grid-item low">
          <h3>Low</h3>
          <p>{showRecentData.low.length} countries</p>
        </div>
        <div className="grid-item moderate">
          <h3>Moderate</h3>
          <p>{showRecentData.moderate.length} countries</p>
        </div>
        <div className="grid-item serious">
          <h3>Serious</h3>
          <p>{showRecentData.serious.length} countries</p>
        </div>
        <div className="grid-item alarming">
          <h3>Alarming</h3>
          <p>{showRecentData.alarming.length} countries</p>
        </div>
        <div className="grid-item extremely-alarming">
          <h3>Extremely Alarming</h3>
          <p>{showRecentData.extremelyAlarming.length} countries</p>
        </div>
      </div>
    </div>
  );
};

export default App;

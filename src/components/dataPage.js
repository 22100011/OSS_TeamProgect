import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [year, setYear] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://6743ce15b7464b1c2a65e803.mockapi.io/GHI');
      const data = await response.json();
      setData(data); // 전체 데이터 저장
      setFilteredData(data); // 초기 필터 데이터도 전체로 설정
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 특정 연도로 필터링
  const filterByYear = () => { //year에 아무것도 적지 않았으면 그냥 다 출력해
    let filter = [];
    if (year === '') {
      filter = [...data];
    } else {
      filter = data.filter((item) => item.year === parseInt(year));
    }

    setFilteredData(filter);
  };

  // GHI 값 기준으로 정렬
  const sortByGHIDown = () => {
    const sorted = [...filteredData].sort((a, b) => parseFloat(a.ghi) - parseFloat(b.ghi));
    setFilteredData(sorted);
  };
  const sortByGHIUp = () => {
    const sorted = [...filteredData].sort((a, b) => parseFloat(b.ghi) - parseFloat(a.ghi));
    setFilteredData(sorted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)} // 선택된 값을 업데이트
        style={{ padding: '5px', marginRight: '10px' }}
      >
        <option value="">Select Year</option>
        <option value={2023}>2023</option>
        <option value={2019}>2019</option>
        <option value={2015}>2015</option>
        <option value={2011}>2011</option>
      </select>

      <button onClick={filterByYear} style={{ padding: '5px 10px', marginRight: '10px' }}>
        적용
      </button>

      <button onClick={sortByGHIDown} style={{ padding: '5px 10px' }}>
        Sort by GHI Down
      </button>

      <button onClick={sortByGHIUp} style={{ padding: '5px 10px' }}>
        Sort by GHI Up
      </button>

      <table style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Country</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Year</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>GHI</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Stunting</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Wasting</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Undernourishment</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Mortality</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{item.country}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{item.year}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{item.ghi}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{item.child_stunting}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{item.child_wasting}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{item.undernourishment}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{item.child_mortality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
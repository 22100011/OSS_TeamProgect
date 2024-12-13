import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../css/dataPage.css';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [year, setYear] = useState('');
  const [country, setCountry] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://6743ce15b7464b1c2a65e803.mockapi.io/GHI');
      const data = await response.json();
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 연도와 국가를 동시에 필터링
  const applyFilters = () => {
    let filtered = [...data];

    if (year !== '') {
      filtered = filtered.filter((item) => item.year === parseInt(year));
    }

    if (country !== '') {
      filtered = filtered.filter((item) => item.country === country);
    }

    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setYear(''); // 연도 필터 초기화
    setCountry(''); // 국가 필터 초기화
    setFilteredData([...data]); // 전체 데이터 복원
  }

  // GHI 값 기준 정렬
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
    <div className="container">
      <div className="filter_section">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="filter_select"
        >
          <option value="">Year all</option>
          <option value={2023}>2023</option>
          <option value={2019}>2019</option>
          <option value={2015}>2015</option>
          <option value={2011}>2011</option>
        </select>
        

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="filter_select"
        >
          <option value="">Country all</option>
          {[
            'Nigeria',
            'Kenya',
            'South Africa',
            'Ethiopia',
            'Algeria',
            'Morocco',
            'Sudan',
            'Tanzania',
            'Uganda',
            'Angola',
            'Mozambique',
            'Zambia',
            'Zimbabwe',
            'Cameroon',
            'Senegal',
            'Chad',
            'Niger',
            'Burkina Faso',
            'Somalia',
            'Congo',
            'Rwanda',
            'Botswana',
          ].map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <button onClick={applyFilters} className="filter_button">
          Apply
        </button>

        <button onClick={sortByGHIDown} className="filter_button" style={{marginLeft:"25px"}}>
          Sort by GHI ↓
        </button>

        <button onClick={sortByGHIUp} className="filter_button">
          Sort by GHI ↑
        </button>

        <button onClick={resetFilters} className="filter_button" style={{marginLeft:"25px"}}>
          Reset
        </button>

        <Link to="/crud" className='edit_button'>
          <button className="edit_butto">
            Edit
          </button>
        </Link>
      </div>

      {filteredData.length === 0 ? (
        <p className="no_data_message">No data available for the selected filters.</p>
      ) : (
        <table className="data_table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Year</th>
              <th>GHI</th>
              <th>Stunting</th>
              <th>Wasting</th>
              <th>Undernourishment</th>
              <th>Mortality</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.country}</td>
                <td>{item.year}</td>
                <td>{item.ghi}</td>
                <td>{item.child_stunting}</td>
                <td>{item.child_wasting}</td>
                <td>{item.undernourishment}</td>
                <td>{item.child_mortality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;

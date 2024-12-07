import React, { useState, useEffect } from 'react';
import ModalData from '../components/modalData';

const App = () => {
  const [GHIData, setGHIData] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터된 데이터
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [country, setCountry] = useState('');

  // 데이터 가져오기
  const fetchGHI = async () => {
    try {
      const response = await fetch('https://6743ce15b7464b1c2a65e803.mockapi.io/GHI');
      const data = await response.json();
      setGHIData(data);
      setFilteredData(data); // 초기에는 전체 데이터를 표시
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 데이터 생성
  const createData = async (formData) => {
    try {
      const response = await fetch('https://6743ce15b7464b1c2a65e803.mockapi.io/GHI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) fetchGHI(); // 데이터 갱신
    } catch (error) {
      console.error('데이터 생성하는 중 오류 발생:', error);
    }
  };

  // 데이터 업데이트
  const updateData = async (id, formData) => {
    try {
      const response = await fetch(`https://6743ce15b7464b1c2a65e803.mockapi.io/GHI/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) fetchGHI();
    } catch (error) {
      console.error('데이터 업데이트하는 중 오류 발생:', error);
    }
  };

  // 데이터 삭제
  const deleteData = async (id) => {
    try {
      const response = await fetch(`https://6743ce15b7464b1c2a65e803.mockapi.io/GHI/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) fetchGHI();
    } catch (error) {
      console.error('데이터 삭제하는 중 오류 발생:', error);
    }
  };

  // 모달 열기
  const openModal = (data = null, updateMode = false) => {
    setCurrentData(data);
    setIsUpdateMode(updateMode);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setCurrentData(null);
    setIsModalOpen(false);
  };

  // 모달 제출
  const handleModalSubmit = (formData) => {
    if (isUpdateMode) {
      updateData(currentData.id, formData);
    } else {
      createData(formData);
    }
    closeModal();
  };

  // 국가 필터링
  const filterByCountry = () => {
    if (country === '') {
      setFilteredData([...GHIData]); // 필터링 없이 전체 데이터
    } else {
      const filter = GHIData.filter((item) => item.country === country);
      setFilteredData(filter); // 필터링된 데이터 설정
    }
  };

  useEffect(() => {
    fetchGHI();
  }, []);

  return (
    <div>
      <button onClick={() => openModal()}>추가</button>

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}>
        <option value="">Select Country</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Kenya">Kenya</option>
        <option value="South Africa">South Africa</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Algeria">Algeria</option>
        <option value="Morocco">Morocco</option>
        <option value="Sudan">Sudan</option>
        <option value="Tanzania">Tanzania</option>
        <option value="Uganda">Uganda</option>
        <option value="Angola">Angola</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Senegal">Senegal</option>
        <option value="Chad">Chad</option>
        <option value="Niger">Niger</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Somalia">Somalia</option>
        <option value="Congo">Congo</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Botswana">Botswana</option>

      </select>
      <button onClick={filterByCountry}>적용</button>

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
            <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
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
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button onClick={() => openModal(item, true)}>수정</button>
                <button onClick={() => deleteData(item.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ModalData
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          initialData={currentData}
          isUpdateMode={isUpdateMode}
        />
      )}
    </div>
  );
};

export default App;

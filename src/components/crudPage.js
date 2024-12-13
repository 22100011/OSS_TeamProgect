import React, { useState, useEffect } from 'react';
import ModalData from '../components/modalData';
import "../css/crudPage.css"

const App = () => {
  const [GHIData, setGHIData] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터된 데이터
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);


  // 데이터 가져오기
  const fetchGHI = async () => {
    try {
      const response = await fetch('https://6743ce15b7464b1c2a65e803.mockapi.io/GHI');
      const data = await response.json();
      setGHIData(data);
      setFilteredData(data);
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

  useEffect(() => {
    fetchGHI();
  }, []);

  return (

    <div className="container">
      <button className='create_btn' onClick={() => openModal()}>Create</button>

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
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
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
              <td>{item.latitude}</td>
              <td>{item.longitude}</td>
              <td>
                <div className='edit_delete_btn'>
                  <button className='edit_btn' onClick={() => openModal(item, true)}>Edit</button>
                  <button className='delete_btn' onClick={() => deleteData(item.id)}>Delete</button>
                </div>
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

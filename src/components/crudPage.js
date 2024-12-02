import React, { useState, useEffect } from 'react';
import ModalData from '../components/modalData';

const App = () => {
  const [GHIData, setGHIData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // 데이터 가져오기
  const fetchGHI = async () => {
    try {
      const response = await fetch('https://6743ce15b7464b1c2a65e803.mockapi.io/GHI');
      const data = await response.json();
      setGHIData(data);
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
    <div>
      <br/>
      <button onClick={() => openModal()}>추가</button>

      <div>
        {GHIData.map((item) => (
          <div key={item.id}>
            <p>
              <strong>Country:</strong> {item.country} | <strong>Year:</strong> {item.year} |{' '}
              <strong>GHI:</strong> {item.ghi} | <strong>Stunting:</strong> {item.child_stunting} |{' '}
              <strong>Wasting:</strong> {item.child_wasting} |{' '}
              <strong>Undernourishment:</strong> {item.undernourishment} |{' '}
              <strong>Mortality:</strong> {item.child_mortality}
            </p>
            <button onClick={() => openModal(item, true)}>수정</button>
            <button onClick={() => deleteData(item.id)}>삭제</button>
          </div>
        ))}
      </div>

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
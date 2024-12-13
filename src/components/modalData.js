import React, { useState, useEffect } from 'react';
import '../css/modal.css';

const ModalData = ({ isOpen, onClose, onSubmit, initialData = {}, isUpdateMode }) => {
  const [formData, setFormData] = useState({
    country: '',
    year: '',
    child_stunting: '',
    child_wasting: '',
    undernourishment: '',
    child_mortality: '',
    ghi: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    if (isUpdateMode && initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        country: '',
        year: '',
        child_stunting: '',
        child_wasting: '',
        undernourishment: '',
        child_mortality: '',
        ghi: '',
        latitude: '',
        longitude: '',
      });
    }
  }, [isUpdateMode, initialData]);

  // 필드 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 새 필드 값 설정
    const updatedFormData = { ...formData, [name]: value };

    // ghi를 계산함.
    if (['child_stunting', 'child_wasting', 'undernourishment', 'child_mortality'].includes(name)) {
      updatedFormData.ghi = calculateGHI(updatedFormData);
    }

    setFormData(updatedFormData);
  };

  // GHI 계산하는 함수
  const calculateGHI = ({ undernourishment, child_stunting, child_wasting, child_mortality }) => {
    // 필드 값이 0일 경우 기본값을 0으로 처리
    const u = parseFloat(undernourishment) || 0;
    const s = parseFloat(child_stunting) || 0;
    const w = parseFloat(child_wasting) || 0;
    const m = parseFloat(child_mortality) || 0;

    // GHI 계산 공식
    return ((1 / 3) * u + (1 / 6) * s + (1 / 6) * w + (1 / 3) * m).toFixed(2); // 소수점 2자리까지
  };

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <h2>{isUpdateMode ? 'Update Record' : 'Add Record'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Country:
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Year:
            <input
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Child Stunting:
            <input
              name="child_stunting"
              type="number"
              step="0.1"
              value={formData.child_stunting}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Child Wasting:
            <input
              name="child_wasting"
              type="number"
              step="0.1"
              value={formData.child_wasting}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Undernourishment:
            <input
              name="undernourishment"
              type="number"
              step="0.1"
              value={formData.undernourishment}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Child Mortality:
            <input
              name="child_mortality"
              type="number"
              step="0.1"
              value={formData.child_mortality}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            GHI (calculated):
            <input
              name="ghi"
              type="number"
              value={formData.ghi}
              readOnly // ghi는 값을 넣는게 아닌, 나머지 값을 통해 계산된 값이 들어감 
            />
          </label>
          <br />

          <label>
            Latitude:
            <input
              name="latitude"
              type="number"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Longitude
            <input
              name="longitude"
              type="number"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </label>
          <br />


          <button className='modal_button' type="submit">{isUpdateMode ? 'Update' : 'Add'}</button>
          <button className='modal_button' type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalData;

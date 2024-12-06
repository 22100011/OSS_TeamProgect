import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const MapComponent = () => {
    const API_KEY = "AIzaSyAqAUnefQInM7WM_fDDIrzvmRXk6UFJbQQ";

    const initialCenter = {
        lat: 6.6111, 
        lng: 20.9394, 
    };

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const mapRef = useRef(null);

    const [selectedMarker, setSelectedMarker] = useState(null); // 선택된 마커 데이터 저장
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    const mapOptions = {
        //minZoom: 3,
        maxZoom: 10,
        restriction: {
            latLngBounds: {
                north: 45.0, // 북쪽 끝
                south: -45.0, // 남쪽 끝
                west: -120.0, // 서쪽 끝
                east: 120.0, // 동쪽 끝
            },
            strictBounds: true, // 지도 이동 제한
        },
    };

    const fetchData = async () => {
        try {
            const response = await fetch("https://6743ce15b7464b1c2a65e803.mockapi.io/GHI");
            const result = await response.json();
            setData(result);
            setFilteredData(result);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const moveToBusan = () => {
        if (mapRef.current) {
            mapRef.current.panTo({ lat: 35.1796, lng: 129.0756 });
            mapRef.current.setZoom(10);
        }
    };

    useEffect(() => {
        fetchData(); // 컴포넌트 로드 시 데이터 가져오기
    }, []);

    const closeModal = () => {
        setSelectedMarker(null);
        setIsModalOpen(false);
    };

    return (
        <LoadScript googleMapsApiKey={API_KEY}>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "500px" }}
                center={initialCenter}
                zoom={3}
                options={mapOptions}
                onLoad={(map) => (mapRef.current = map)}
            >
                {filteredData
                .filter((item) => item.year === 2023) // year가 2023인 데이터만 필터링
                .map((item) => {
                    // GHI 점수에 따른 아이콘 설정
                    let iconUrl = "";
                    if (item.ghi >= 0.0 && item.ghi <= 9.9) {
                        iconUrl = "/icon/low.png"; // GHI 낮음
                    } else if (item.ghi >= 10.0 && item.ghi <= 19.9) {
                        iconUrl = "/icon/moderate.png"; // GHI 보통
                    } else if (item.ghi >= 20.0 && item.ghi <= 34.9) {
                        iconUrl = "/icon/serious.png"; // GHI 심각
                    } else if (item.ghi >= 35.0 && item.ghi <= 49.9) {
                        iconUrl = "/icon/alarming.png"; // GHI 매우 심각
                    } else if (item.ghi >= 50.0) {
                        iconUrl = "/icon/extremely-alarming.png"; // GHI 극도로 심각
                    }

                    // 마커 컴포넌트 생성
                    return (
                        <MarkerF
                            key={item.id}
                            position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
                            icon={{
                                url: iconUrl,
                                scaledSize: new window.google.maps.Size(32, 32), // 크기 설정 (px 단위)
                            }}
                            onClick={() => {
                                setSelectedMarker(item); // 선택된 데이터 저장
                                setIsModalOpen(true); // 모달 열기
                            }}
                        />
                    );
                })}

                     {/* 모달 창 */}
                {isModalOpen && selectedMarker && (
                    <div style={modalStyle}>
                        <div style={modalContentStyle}>
                            <h2>Marker Details</h2>
                            <p><strong>Country:</strong> {selectedMarker.country}</p>
                            <p><strong>Year:</strong> {selectedMarker.year}</p>
                            <p><strong>GHI:</strong> {selectedMarker.ghi}</p>
                            <p><strong>Stunting:</strong> {selectedMarker.child_stunting}%</p>
                            <p><strong>Wasting:</strong> {selectedMarker.child_wasting}%</p>
                            <p><strong>Undernourishment:</strong> {selectedMarker.undernourishment}%</p>
                            <p><strong>Mortality:</strong> {selectedMarker.child_mortality}%</p>
                            <button onClick={closeModal} style={buttonStyle}>Close</button>
                        </div>
                    </div>
                )}

            </GoogleMap>

            <button onClick={moveToBusan} style={{ marginTop: "10px" }}>
                부산으로 이동
            </button>
        </LoadScript>
    );
};

export default MapComponent;

// 모달 스타일
const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const buttonStyle = {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};


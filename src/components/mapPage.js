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
                        iconUrl = "/low.png"; // GHI 낮음
                    } else if (item.ghi >= 10.0 && item.ghi <= 19.9) {
                        iconUrl = "/moderate.png"; // GHI 보통
                    } else if (item.ghi >= 20.0 && item.ghi <= 34.9) {
                        iconUrl = "/serious.png"; // GHI 심각
                    } else if (item.ghi >= 35.0 && item.ghi <= 49.9) {
                        iconUrl = "/alarming.png"; // GHI 매우 심각
                    } else if (item.ghi >= 50.0) {
                        iconUrl = "/extremely-alarming.png"; // GHI 극도로 심각
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
                            onClick={() => alert(`Marker Details:\n${JSON.stringify(item, null, 2)}`)} // 모든 속성 출력
                        />
                    );
                })}

            </GoogleMap>

            <button onClick={moveToBusan} style={{ marginTop: "10px" }}>
                부산으로 이동
            </button>
        </LoadScript>
    );
};

export default MapComponent;

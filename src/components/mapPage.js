import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";

const MapComponent = () => {
    // Google Maps API 키
    const API_KEY = "AIzaSyAqAUnefQInM7WM_fDDIrzvmRXk6UFJbQQ";

    // 초기 지도 설정
    const initialCenter = {
        lat: 37.5665, // 서울 위도
        lng: 126.9780, // 서울 경도
    };

    const locations = [ // lat : 위도, lng : 경도
        { id: 1, name: "Seoul", lat: 37.5665, lng: 126.9780 },
        { id: 2, name: "Busan", lat: 35.1796, lng: 129.0756 },
        { id: 3, name: "Daegu", lat: 35.8722, lng: 128.6018 },
        { id: 4, name: "Pohang", lat: 36.00568611, lng: 129.3616667 }
    ];

    // const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 위치 관리
    const mapRef = useRef(null);

    // 지도 옵션 설정
    const mapOptions = {
        minZoom: 5, // 최소 줌 레벨
        maxZoom: 10, // 최대 줌 레벨
    };

    // 지도 화면을 부산으로 이동
    const moveToBusan = () => {
        if (mapRef.current) {
            mapRef.current.panTo({ lat: 35.1796, lng: 129.0756 }); // 부산으로 부드럽게 이동
            mapRef.current.setZoom(10); // 줌 레벨 변경
        }
    };

    return (
        <LoadScript googleMapsApiKey={API_KEY}> 
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "500px" }}
                center={initialCenter}
                zoom={7}
                options={mapOptions}
                onLoad={(map) => (mapRef.current = map)} // 지도 로드 시 ref에 저장
            >
                {/* 마커 추가 */}
                {locations.map((location) => (
                    <MarkerF
                        key={location.id}
                        position={{ lat: location.lat, lng: location.lng }}
                        icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                    />
                ))}
            </GoogleMap>

            {/* 부산으로 이동 버튼 */}
            <button onClick={moveToBusan} style={{ marginTop: "10px" }}>
                부산으로 이동
            </button>
        </LoadScript>
    );
};

export default MapComponent;

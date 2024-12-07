import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./map.css";

// Chart.js 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MapComponent = () => {
    const API_KEY = "AIzaSyAqAUnefQInM7WM_fDDIrzvmRXk6UFJbQQ";

    const initialCenter = {
        lat: 6.6111,
        lng: 20.9394,
    };

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const mapRef = useRef(null);

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);

    const mapOptions = {
        maxZoom: 10,
        restriction: {
            latLngBounds: {
                north: 45.0,
                south: -45.0,
                west: -120.0,
                east: 120.0,
            },
            strictBounds: true,
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

    useEffect(() => {
        fetchData();
    }, []);

    const closeModal = () => {
        setSelectedMarker(null);
        setIsModalOpen(false);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    const openDetailsModal = () => {
        setIsModalOpen(false);
        setIsDetailsModalOpen(true);
    };

    const openHomeModal = () => {
        setIsDetailsModalOpen(false);
        setIsGraphModalOpen(false);
        setIsModalOpen(true);
    };

    const openHomeModal2 = () => {
        setIsGraphModalOpen(false);
        setIsModalOpen(true);
    };

    const openGraphModal = () => {
        setIsDetailsModalOpen(false);
        setIsGraphModalOpen(true);
    };

    const closeGraphModal = () => {
        setIsGraphModalOpen(false);
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
                    .filter((item) => item.year === 2023)
                    .map((item) => {
                        let iconUrl = "";
                        if (item.ghi >= 0.0 && item.ghi <= 9.9) {
                            iconUrl = "/icon/low.png";
                        } else if (item.ghi >= 10.0 && item.ghi <= 19.9) {
                            iconUrl = "/icon/moderate.png";
                        } else if (item.ghi >= 20.0 && item.ghi <= 34.9) {
                            iconUrl = "/icon/serious.png";
                        } else if (item.ghi >= 35.0 && item.ghi <= 49.9) {
                            iconUrl = "/icon/alarming.png";
                        } else if (item.ghi >= 50.0) {
                            iconUrl = "/icon/extremely-alarming.png";
                        }

                        return (
                            <MarkerF
                                key={item.id}
                                position={{
                                    lat: parseFloat(item.latitude),
                                    lng: parseFloat(item.longitude),
                                }}
                                icon={{
                                    url: iconUrl,
                                    scaledSize: new window.google.maps.Size(32, 32),
                                }}
                                onClick={() => {
                                    setSelectedMarker(item);
                                    setIsModalOpen(true);
                                }}
                            />
                        );
                    })}

                {isModalOpen && selectedMarker && (
                    <div className="modal">
                        <div className="modal-content-home">
                            <h2>Marker Details</h2>
                            <p><strong>Country:</strong> {selectedMarker.country}</p>
                            <p><strong>Year:</strong> {selectedMarker.year}</p>
                            <p><strong>GHI:</strong> {selectedMarker.ghi}</p>
                            <p><strong>Stunting:</strong> {selectedMarker.child_stunting}%</p>
                            <p><strong>Wasting:</strong> {selectedMarker.child_wasting}%</p>
                            <p><strong>Undernourishment:</strong> {selectedMarker.undernourishment}%</p>
                            <p><strong>Mortality:</strong> {selectedMarker.child_mortality}%</p>
                            <button onClick={closeModal} className="modal-button">Close</button>
                            <button onClick={openDetailsModal} className="modal-button">View Detail</button>
                        </div>
                    </div>
                )}

                {isDetailsModalOpen && selectedMarker && (
                    <div className="modal">
                        <div className="modal-content-detail">
                            <h2>{selectedMarker.country} - Yearly Details</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>GHI</th>
                                        <th>Stunting</th>
                                        <th>Wasting</th>
                                        <th>Undernourishment</th>
                                        <th>Mortality</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data
                                        .filter((item) => item.country === selectedMarker.country)
                                        .map((item) => (
                                            <tr key={item.year}>
                                                <td>{item.year}</td>
                                                <td>{item.ghi}</td>
                                                <td>{item.child_stunting}%</td>
                                                <td>{item.child_wasting}%</td>
                                                <td>{item.undernourishment}%</td>
                                                <td>{item.child_mortality}%</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <button onClick={closeDetailsModal} className="modal-button">Close</button>
                            <button onClick={openGraphModal} className="modal-button">View Graph</button>
                            <button onClick={openHomeModal} className="modal-button">Back</button>
                        </div>
                    </div>
                )}

                {isGraphModalOpen && selectedMarker && (
                    <GraphModal
                        selectedMarker={selectedMarker}
                        data={data}
                        closeGraph={closeGraphModal}
                        openHomeModal2={openHomeModal} // 함수 전달
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

const GraphModal = ({ selectedMarker, data, closeGraph , openHomeModal2}) => {
    const countryData = data.filter(item => item.country === selectedMarker.country);

    const chartData = {
        labels: countryData.map(item => item.year),
        datasets: [
            {
                label: "GHI",
                data: countryData.map(item => item.ghi),
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
            {
                label: "Stunting (%)",
                data: countryData.map(item => item.child_stunting),
                borderColor: "rgba(255,99,132,1)",
                fill: false,
            },
            {
                label: "Wasting (%)",
                data: countryData.map(item => item.child_wasting),
                borderColor: "rgba(153,102,255,1)",
                fill: false,
            },
            {
                label: "Undernourishment (%)",
                data: countryData.map(item => item.undernourishment),
                borderColor: "rgba(255,206,86,1)",
                fill: false,
            },
            {
                label: "Mortality (%)",
                data: countryData.map(item => item.child_mortality),
                borderColor: "rgba(54,162,235,1)",
                fill: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: "Year" },
            },
            y: {
                title: { display: true, text: "Percentage / Index" },
            },
        },
    };

    return (
        <div className="modal">
            <div className="modal-content-graph">
                <h2>{selectedMarker.country} - Yearly Data Graph</h2>
                <Line data={chartData} options={chartOptions} />
                <button onClick={closeGraph} className="modal-button">Close</button>
                <button onClick={openHomeModal2} className="modal-button">Back</button>
            </div>
        </div>
    );
};

export default MapComponent;

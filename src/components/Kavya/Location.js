import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import customMarkerIcon from "../pin.png";
import L from "leaflet";
import socketIOClient from "socket.io-client";
import Coords from "./Coords";
import "tailwindcss/tailwind.css";

const ENDPOINT = process.env.REACT_APP_API_BASE_URL; // Replace with your socket server URL

const customIcon = L.icon({
  iconUrl: customMarkerIcon,
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapUpdater = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords.lat && coords.long) {
      map.setView([coords.lat, coords.long], 18); // Update map view to the new coordinates
    }
  }, [coords, map]);

  return null;
};

const Location = () => {
  const { senderId } = useParams();
  const [coords, setCoords] = useState({
    lat: 0,
    long: 0,
    speed: 0,
    accuracy: 0,
    altitude: 0,
  });

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("locationUpdate", (data) => {
      console.log("Location update received:", data);
      setCoords(data); // Update location state with received data
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (senderId && socket) {
      console.log(`Joining student room for senderId: ${senderId}`);
      socket.emit("joinStudentRoom", senderId);

      socket.on("locationUpdate", (data) => {
        console.log("Location update received:", data);
        setCoords(data);
      });

      return () => {
        console.log(`Leaving student room for senderId: ${senderId}`);
        socket.off("locationUpdate");
      };
    }
  }, [senderId, socket]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            {coords.lat && coords.long && (
              <MapContainer
                center={[coords.lat, coords.long]}
                zoom={18}
                className="rounded-lg shadow-md"
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[coords.lat, coords.long]} icon={customIcon}>
                  <Popup>
                    <b>Latitude: </b> {coords.lat} <br />
                    <b>Longitude: </b> {coords.long}
                  </Popup>
                </Marker>
                <MapUpdater coords={coords} />
              </MapContainer>
            )}
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700">
            <div className="flex justify-between">
              <Coords label="Speed" value={`${coords.speed} m/s`} />
              <Coords label="Longitude" value={coords.long} />
              <Coords label="Latitude" value={coords.lat} />
              <Coords label="Accuracy" value={coords.accuracy.toFixed(2)} />
              {/* <Coords label="Altitude" value={`${coords.altitude} m`} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;

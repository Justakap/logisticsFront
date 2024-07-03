import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customMarkerIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const DraggableMarker = ({ position, setPosition }) => {
  const markerRef = React.useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        setPosition(marker.getLatLng());
      }
    },
  };

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customMarkerIcon}
    />
  );
};

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 18);
    }
  }, [position, map]);
  return null;
};

const AddStops = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [stops, setStops] = useState([]);
  const [error, setError] = useState("");
  const [stopName, setStopName] = useState("");
  const [organization, setOrganization] = useState("SKIT");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/stops`
        );
        setStops(response.data);
      } catch (err) {
        setError("Error fetching stops. Please try again.");
      }
    };
    fetchStops();
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      const fetchLocations = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${search}&format=json&addressdetails=1`
          );
          setSearchResults(response.data);
          setError("");
        } catch (err) {
          setError("Error fetching locations. Please try again.");
        }
      };
      fetchLocations();
    }
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (result) => {
    setSelectedLocation({ lat: result.lat, lon: result.lon });
    console.log(selectedLocation)
    setShowResults(false);
  };

  const handleSaveStop = async () => {
    if (!stopName || !organization || !selectedLocation) {
      toast.error("All fields are required");
      return;
    }

    const newStop = {
      name: stopName,
      org: organization,
      lat: selectedLocation.lat,
      long: selectedLocation.lng,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/add-stop`,
        newStop
      );
      setStops([...stops, newStop]);
      setShowPopup(false);
      setSelectedLocation(null);
      setSearch("");
      setStopName("");
      setOrganization("");
      setError("");
      toast.success("Stop saved successfully");
      console.log(response);
    } catch (err) {
      console.log(newStop);
      toast.error("Error saving stop. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="p-6 bg-gray-50 rounded-lg shadow-md">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Add Stops
        </h2>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="stopName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Stop Name
              </label>
              <input
                type="text"
                id="stopName"
                value={stopName}
                onChange={(e) => setStopName(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                placeholder="Stop Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="organization"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Organization
              </label>
              <input
                type="text"
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                placeholder="Organization"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="w-full sm:w-auto px-5 py-2.5 text-center text-white bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
            >
              Select Location
            </button>
          </div>
        </form>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto flex flex-col">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => setShowPopup(false)}
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Search for Location
              </h3>
              <input
                type="text"
                value={search}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 mb-4"
                placeholder="Search location"
              />
              {error && (
                <div className="text-red-600 mb-4">
                  {error}
                </div>
              )}
              {showResults && (
                <div className="flex-1 overflow-y-auto h  mb-4">
                  <ul>
                    {searchResults.map((result, index) => (
                      <li
                        key={index}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                        // onClick={() => handleResultClick(result)}
                        onClick={() => handleResultClick(searchResults[0])}

                      >
                        {result.display_name}
                      </li>
                    ))}
                  </ul>
                  
                </div>
                
              )}
              
              {selectedLocation && (
                <div className="mb-4">
                  <MapContainer
                    center={[selectedLocation.lat, selectedLocation.lon]}
                    zoom={10}
                    style={{ height: "200px", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <DraggableMarker
                      position={selectedLocation}
                      setPosition={setSelectedLocation}
                    />
                    <MapUpdater position={selectedLocation} />
                  </MapContainer>
                </div>
                
              )}
              <span className=" text-slate-600 text-xs">Move the Marker to adjust the location</span>
              <div className="bottom-0 left-0 right-0 border-t border-gray-300 bg-white p-4">
                <button
                  onClick={handleSaveStop}
                  className="w-full px-5 py-2.5 text-center text-white bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
                  disabled={!selectedLocation || loading}
                >
                  {loading ? "Saving..." : "Save Stop"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ul>
        {stops.map((stop, index) => (
          <li
            key={index}
            className="mb-2 p-4 rounded-lg shadow flex justify-between items-center mt-5 bg-gray-100"
          >
            <div className="flex-1 mr-4">
              <input
                type="text"
                value={stop.name}
                disabled
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black p-2.5"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={`Lat: ${stop.lat}, Long: ${stop.long}`}
                disabled
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black p-2.5"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddStops;

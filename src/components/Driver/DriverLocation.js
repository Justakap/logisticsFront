import React, { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DriverValidate from './DriverValidate';

export default function DriverLocation(props) {
    // const { trips } = props
    const history = useNavigate();
    const user = DriverValidate()

    const socket = useMemo(() => io(process.env.REACT_APP_API_BASE_URL), []);

    const [trips, setTrips] = useState([]);
    const [currentTripCode, setCurrentTripCode] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/trips`)
          .then(response => {
            setTrips(response.data);
            // Assuming you want to find the roomCode where the sender is the owner
            const room = response.data.find(room => room.owner === user.email && room.currentStatus===true);
            if (room) {
              setCurrentTripCode(room.tripCode);
            }
          })
          .catch(err => console.error(err));
      }, [user]);



    useEffect(() => {
        if (currentTripCode) {
            console.log(`Driver joining trip with tripCode: ${currentTripCode}`);
            socket.emit('org-joinDrivertrip', currentTripCode);
        }
    }, [currentTripCode, socket]);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("Your browser doesn't support geolocation feature!");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude: lat, longitude: long, accuracy, altitude, altitudeAccuracy, heading, speed } = position.coords;
                const date = new Date(position.timestamp);
                const year = date.getFullYear();
                const month = String(date.toLocaleString('default', { month: 'long' }));
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                const LastUpdated = `${hours}:${minutes}:${seconds} ${day}-${month}`;

                console.log(`Emitting location: ${lat}, ${long}, Accuracy: ${accuracy} LastUpdated: ${LastUpdated}`);
                if (user && user._id && currentTripCode) {
                    socket.emit('org-locationUpdate', { userId: user._id, tripCode: currentTripCode, lat, long, accuracy, altitude, altitudeAccuracy, heading, speed, LastUpdated });
                }
            },
            (error) => {
                console.error('Error getting geolocation:', error.message);
            },
            { enableHighAccuracy: false, maximumAge: 0, timeout: 10000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [user, socket, currentTripCode]);

    const stopSharing = () => {
        console.log('Stopping sharing for trip:', currentTripCode);
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/update-trip/${currentTripCode}`, {
            currentStatus: false,
            endedAt: Date.now()

        })
            .then(response => {
                console.log('Trip ended:', currentTripCode);
                if (user && user._id && currentTripCode) {
                    socket.emit('org-locationEnded', { userId: user._id, tripCode: currentTripCode, });
                }
                history("/driver/home");
            })
            .catch(error => {
                console.error('Error deleting trip:', error);
            });
    }


    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_API_OWN_URL}/student/${currentTripCode}`)
            .then(() => {
                console.log('Link copied to clipboard');
            })
            .catch(err => console.error('Error copying link:', err));
    }

    return (
        <>
            <div className='text-5xl'>Driver</div>
            {user ? (
                <>
                    <div>Username: {user.name}</div>
                    Location Sharing Link :
                    <Link className='text-blue-500 cursor-pointer hover:text-blue-600' to={`${process.env.REACT_APP_API_OWN_URL}/student/${currentTripCode}`}>
                        {`${process.env.REACT_APP_API_OWN_URL}/student/${currentTripCode}`}
                    </Link><br />
                    <button onClick={copyToClipboard} className='mx-2 mt-3 p-2 bg-blue-500 text-white font-semibold rounded-md'>Copy Link</button>
                    <button onClick={stopSharing} className='p-2 bg-red-500 text-white font-semibold rounded-md'>Stop Sharing</button>
                </>
            ) : (
                <div>Loading user data...</div>
            )}
        </>
    );
}

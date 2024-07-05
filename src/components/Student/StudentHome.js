import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentHome(props) {
    const { org, stop, vehicle } = props;
    const navigate = useNavigate();
    const [studentOrg, setStudentOrg] = useState("N/A");
    const [studentStop, setStudentStop] = useState("N/A");


    // const user = studentValidate()
    const user = {
        "_id": {
            "$oid": "6686dac2d53e11a88e3caa04"
        },
        "email": "kabir@gmail.com",
        "password": "05esh3nD",
        "name": "Kabir",
        "contact": "9872398249",
        "emergencyContact": "98237498293",
        "org": "66853326d039c58205bf224f",
        "stop": "6686d91dd53e11a88e3ca925",
        "__v": 0
    };

    useEffect(() => {
        console.log('Props:', { org, stop, vehicle });
        if (org && stop && user) {
            const orgDetails = org.find(e => e._id === user.org);
            const stopDetails = stop.find(e => e._id === user.stop);
            if (orgDetails) {
                setStudentOrg(orgDetails.name);
            } else {
                console.error('Organization not found');
            }
            if (stopDetails) {
                setStudentStop(stopDetails.name);
            } else {
                console.error('Stop not found');
            }
        }
    }, [org, stop, user]);

    return (
        <>
            <h2 className='text-2xl'>Student Info</h2>
            <h2 className='text-xl'>Student Name: {user.name}</h2>
            <h2 className='text-xl'>Organization: {studentOrg}</h2>
            <h2 className='text-xl'>Student Stop: {studentStop}</h2>
            <h2 className='text-xl'>Student Contact: {user.contact}</h2>
            <h2 className='text-xl'>Student Emergency Contact: {user.emergencyContact}</h2>
            <h2 className='text-xl mb-8'>Student Alloted Route: {"2"}</h2>
            <div className='m-4'> List Of Available Vehicles</div>
            {vehicle.filter(e => e.org === user.org).map(e => (
                <div className='flex space-x-5 m-4' key={e._id}>
                    <div className="p-3 bg-green-500 text-white font-bold rounded-lg text-center">{e.name} </div>
                    <div className=" p-3 bg-blue-500 text-white font-bold rounded-lg text-center">
                        <Link to={`http://localhost:3000/student/`}>Track</Link>
                        </div>

                    
                </div>
            ))}

        </>
    );
}

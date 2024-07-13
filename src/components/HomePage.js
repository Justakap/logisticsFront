import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
            <div className="flex mx-3">
                <Link to={"/driver/login"}>Driver</Link>
                <Link to={"/student/login"}>Student</Link>
                <Link to={"/org/login"}>Organization</Link>
                <Link to={"/choice"}>Choice</Link>
                <Link to={"/Login"}>Login</Link>
            </div>

        </>)
}

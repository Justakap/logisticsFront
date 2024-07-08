import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
            <Link to={"/driver/login"}>Driver</Link>
            <Link to={"/student/login"}>Student</Link>
            <Link to={"/org/login"}>Organization</Link>
            <Link to={"/choice"}>Choice</Link>
        </>)
}

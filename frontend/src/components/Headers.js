import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom"
const Headers = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink to="/" className=" text-light text-decoration-none">Hostel</NavLink>
                    <Nav className="">
                        <NavLink to="/signup" className="mt-3 mx-2 text-light text-decoration-none">Register</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Headers
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const username = localStorage.getItem('username');
        setIsLoggedIn(!!username);
    }, []);

    const handleLogin = () => {
        window.location.href = '/Login';
    };

    const handleSignUp = () => {
        window.location.href = '/SignUp';
    };

    const handleHome = () => {
        window.location.href = '/';
    };

    const handleLogout = () => {

        localStorage.removeItem('username');

        navigate('/');
    };


    return (
        <Navbar expand="lg" style={{ background: '#28f0ceba', padding: '15px 20px', zIndex: 1030, boxShadow: '0 4px 15px rgba(0, 0, 0, 1.2)', borderBottomLeftRadius: '9px', borderBottomRightRadius: '9px' }}>

            <Container>
                <Navbar.Brand href="#" style={{ color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center',fontFamily: "'Times New Roman', Times, serif",fontSize: '30px', }}>
                    <img
                        src="./logo.PNG"
                        alt="Logo"
                        style={{ width: '50px', height: '50px', marginRight: '15px', }}
                    />
                    SnippetLab
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link onClick={handleHome} style={{
                            color: '#000', fontWeight: 'bold', textDecoration: 'none',
                            padding: '10px 15px',
                            margin: '0 10px',
                            borderRadius: '20px',
                            transition: 'box-shadow 0.3s',
                            boxShadow: 'none',
                            fontFamily: "'Times New Roman', Times, serif",fontSize: '18px',
                        }} onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6)'}
                            onMouseLeave={(e) => e.target.style.boxShadow = 'none'}>Home</Nav.Link>

                        <>
                            <Nav.Link
                                onClick={handleSignUp}
                                style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    padding: '10px 15px',
                                    margin: '0 10px',
                                    borderRadius: '20px',
                                    transition: 'box-shadow 0.3s',
                                    boxShadow: 'none',
                                    fontFamily: "'Times New Roman', Times, serif",fontSize: '18px',
                                }}
                                onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6)'}
                                onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                            >
                                Sign Up
                            </Nav.Link>

                            <Nav.Link onClick={handleLogin} style={{
                                color: '#000',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                padding: '10px 15px',
                                margin: '0 10px',
                                borderRadius: '20px',
                                transition: 'box-shadow 0.3s',
                                boxShadow: 'none',
                                fontFamily: "'Times New Roman', Times, serif",fontSize: '18px',
                            }} onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6)'}
                                onMouseLeave={(e) => e.target.style.boxShadow = 'none'}>Login</Nav.Link>
                        </>


                        <Nav.Link onClick={handleLogout} style={{ color: '#000', fontWeight: 'bold',textDecoration: 'none',
                                    padding: '10px 15px',
                                    margin: '0 10px',
                                    borderRadius: '20px',
                                    transition: 'box-shadow 0.3s',
                                    boxShadow: 'none',fontFamily: "'Times New Roman', Times, serif",fontSize: '18px', }} onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6)'}
                                    onMouseLeave={(e) => e.target.style.boxShadow = 'none'}>Logout</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
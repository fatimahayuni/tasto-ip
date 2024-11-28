import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useJwt } from './UserStore'; // Assuming useJwt is managing JWT state


function Navbar() {
    const [isNavbarShowing, setNavbarShowing] = useState(false);
    const [location] = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { jwt } = useJwt();  // Get JWT token from global state (or context)

    // This useEffect checks the presence of JWT when the component mounts
    useEffect(() => {
        // Check if JWT is in the global state or localStorage
        if (jwt || localStorage.getItem('jwt')) {
            setIsLoggedIn(true); // If JWT exists, set logged in state
        } else {
            setIsLoggedIn(false); // Otherwise, set logged out state
        }
    }, [jwt]);  // Re-run if JWT changes (after login/logout)

    // Handle logout (remove JWT, update state, and redirect)
    const handleLogout = () => {
        localStorage.removeItem('jwt'); // Clear the JWT from localStorage
        setIsLoggedIn(false); // Update state to reflect logout
        window.location.href = '/'; // Redirect to homepage or login page
    };

    const toggleNavbar = () => setNavbarShowing(!isNavbarShowing);

    const syncNavbarState = () => {
        setNavbarShowing(window.innerWidth >= 992);
    };

    useEffect(() => {
        syncNavbarState();
        window.addEventListener('resize', syncNavbarState);
        return () => window.removeEventListener('resize', syncNavbarState);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link className="navbar-brand" href="/">Zeffyr's Cupcakes</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarNav"
                    aria-expanded={isNavbarShowing ? "true" : "false"}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/products" className={`nav-link ${location === '/products' ? 'active' : ''}`}>Cupcakes</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/cart" className={`nav-link ${location === '/cart' ? 'active' : ''}`}>Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/register" className={`nav-link ${location === '/register' ? 'active' : ''}`}>Register</Link>
                        </li>

                        {/* Conditionally render Login/Logout */}
                        <li className="nav-item">
                            {isLoggedIn ? (
                                <button
                                    className="nav-link btn btn-link"
                                    style={{ textDecoration: 'none' }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link href="/login" className={`nav-link ${location === '/login' ? 'active' : ''}`}>Login</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

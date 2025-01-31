import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/events?category=${category}`);
    };

    return (
        <div className="home-container">
            <div className="hero-section text-center py-5">
                <div className="container">
                    <h1 className="display-4 fw-bold mb-4">Welcome to EventHub</h1>
                    <p className="lead mb-5">Discover and book amazing events happening around you</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/login" className="btn btn-primary btn-lg px-5">
                            Sign In
                        </Link>
                        <Link to="/events" className="btn btn-outline-primary btn-lg px-5">
                            Browse Events
                        </Link>
                    </div>
                </div>
            </div>

            <div className="categories-section py-5">
                <div className="container">
                    <h2 className="section-title">Browse by Category</h2>
                    <div className="category-grid">
                        <div 
                            className="category-card movies"
                            onClick={() => handleCategoryClick('Movies')}
                        >
                            <div className="category-icon">
                                <i className="bi bi-film"></i>
                            </div>
                            <h3>Movies</h3>
                            <p>Watch the latest blockbusters and timeless classics</p>
                        </div>
                        <div 
                            className="category-card concerts"
                            onClick={() => handleCategoryClick('Concerts')}
                        >
                            <div className="category-icon">
                                <i className="bi bi-music-note-beamed"></i>
                            </div>
                            <h3>Concerts</h3>
                            <p>Experience live music from your favorite artists</p>
                        </div>
                        <div 
                            className="category-card sports"
                            onClick={() => handleCategoryClick('Sports')}
                        >
                            <div className="category-icon">
                                <i className="bi bi-trophy"></i>
                            </div>
                            <h3>Sports</h3>
                            <p>Cheer for your teams at exciting sporting events</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-section py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-4">
                                        <i className="bi bi-ticket-perforated"></i>
                                    </div>
                                    <h3 className="card-title h4 mb-3">Easy Booking</h3>
                                    <p className="card-text text-secondary">Book tickets quickly and securely with just a few clicks.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-4">
                                        <i className="bi bi-bell"></i>
                                    </div>
                                    <h3 className="card-title h4 mb-3">Stay Updated</h3>
                                    <p className="card-text text-secondary">Get notifications about upcoming events and special offers.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-4">
                                        <i className="bi bi-calendar-event"></i>
                                    </div>
                                    <h3 className="card-title h4 mb-3">Discover Events</h3>
                                    <p className="card-text text-secondary">Find the best events in your area, from concerts to sports games.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

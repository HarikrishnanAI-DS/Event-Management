import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllEvents, deleteEvent } from '../eventsApi';
import './EventList.css';

const EventList = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category');

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [categoryFromUrl]);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const data = await getAllEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error loading events:', error);
            setError('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                setEvents(events => events.filter(event => event._id !== id));
                alert('Event deleted successfully!');
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete event. Please try again.');
            }
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            navigate('/events');
        } else {
            navigate(`/events?category=${category}`);
        }
    };

    const filteredEvents = selectedCategory === 'All'
        ? events
        : events.filter(event => event.category === selectedCategory);

    const categories = ['All', 'Movies', 'Concerts', 'Sports'];

    if (loading) {
        return (
            <div className="events-container">
                <div className="container">
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="events-container">
                <div className="container">
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="events-container">
            <div className="container">
                <div className="header-section">
                    <h2 className="section-title">Events List</h2>
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/events/new')}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Create Event
                    </button>
                </div>

                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {filteredEvents.length === 0 ? (
                    <div className="no-events">
                        <i className="bi bi-calendar-x"></i>
                        <h3>No events found</h3>
                        <p>There are no events in this category at the moment.</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {filteredEvents.map(event => (
                            <div key={event._id} className="col-md-6 col-lg-4">
                                <div className="event-card">
                                    <div className="event-details">
                                        <span className={`event-category ${event.category}`}>
                                            {event.category}
                                        </span>
                                        <h3 className="event-title">{event.title}</h3>
                                        <div className="event-info">
                                            <i className="bi bi-calendar3"></i>
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="event-info">
                                            <i className="bi bi-clock"></i>
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="event-info">
                                            <i className="bi bi-geo-alt"></i>
                                            <span>{event.venue}</span>
                                        </div>
                                        <div className="event-info">
                                            <i className="bi bi-person"></i>
                                            <span>{event.availableSeats} seats available</span>
                                        </div>
                                        <div className="event-price">
                                            ₹{event.price}
                                        </div>
                                        <div className="event-actions">
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => navigate(`/events/edit/${event._id}`)}
                                            >
                                                <i className="bi bi-pencil me-1"></i>
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => handleDelete(event._id)}
                                            >
                                                <i className="bi bi-trash me-1"></i>
                                                Delete
                                            </button>
                                            <Link
                                                to={`/events/book/${event._id}`}
                                                className="btn btn-primary"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventList;

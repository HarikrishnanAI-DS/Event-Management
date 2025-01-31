import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, bookEvent } from "../eventsApi";
import "./BookEvent.css";

const BookEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [bookingData, setBookingData] = useState({
        name: "",
        email: "",
        phone: "",
        numberOfTickets: 1
    });

    useEffect(() => {
        loadEvent();
    }, [id]);

    const loadEvent = async () => {
        try {
            setLoading(true);
            const eventData = await getEventById(id);
            setEvent(eventData);
        } catch (error) {
            console.error("Error loading event:", error);
            setError("Failed to load event details");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!event || !event.availableSeats) {
            setError("No seats available");
            return;
        }

        if (bookingData.numberOfTickets > event.availableSeats) {
            setError(`Only ${event.availableSeats} seats available`);
            return;
        }

        try {
            setLoading(true);
            await bookEvent(id, bookingData);
            alert("Booking successful!");
            navigate("/events");
        } catch (error) {
            console.error("Error booking event:", error);
            setError(error.response?.data?.message || "Failed to book event");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">{error}</div>
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate("/events")}
                >
                    Back to Events
                </button>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">Event not found</div>
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate("/events")}
                >
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card booking-card">
                        <div className="card-header">
                            <h3 className="card-title mb-0">Book Event</h3>
                        </div>
                        <div className="card-body">
                            <div className="event-summary mb-4">
                                <h4>{event.title}</h4>
                                <div className="event-details">
                                    <p><i className="bi bi-calendar3"></i> {new Date(event.date).toLocaleDateString()}</p>
                                    <p><i className="bi bi-clock"></i> {event.time}</p>
                                    <p><i className="bi bi-geo-alt"></i> {event.venue}</p>
                                    <p><i className="bi bi-ticket-perforated"></i> ₹{event.price} per ticket</p>
                                    <p><i className="bi bi-person"></i> {event.availableSeats} seats available</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={bookingData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={bookingData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={bookingData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="numberOfTickets" className="form-label">Number of Tickets</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="numberOfTickets"
                                        name="numberOfTickets"
                                        value={bookingData.numberOfTickets}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max={event.availableSeats}
                                    />
                                    <small className="text-muted">
                                        Total Price: ₹{(event.price * bookingData.numberOfTickets).toFixed(2)}
                                    </small>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading || !event.availableSeats}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-cart-check me-2"></i>
                                                Book Now
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate("/events")}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Back to Events
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookEvent;

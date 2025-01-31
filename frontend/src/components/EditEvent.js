import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEvent, getEventById, updateEvent } from '../eventsApi';
import './EditEvent.css';

const EditEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        date: '',
        time: '',
        venue: '',
        price: '',
        totalSeats: '',
        availableSeats: ''
    });

    useEffect(() => {
        if (id) {
            loadEvent();
        }
    }, [id]);

    const loadEvent = async () => {
        try {
            setLoading(true);
            const data = await getEventById(id);
            setFormData(data);
        } catch (error) {
            console.error('Error loading event:', error);
            setError('Failed to load event details');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Update availableSeats when totalSeats changes for new events
            ...(name === 'totalSeats' && !id && { availableSeats: value })
        }));
    };

    const handleCategorySelect = (category) => {
        setFormData(prev => ({
            ...prev,
            category
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            // Validate seats
            const totalSeats = Number(formData.totalSeats);
            const availableSeats = Number(formData.availableSeats);
            
            if (availableSeats > totalSeats) {
                setError('Available seats cannot be more than total seats');
                return;
            }

            const formattedData = {
                ...formData,
                price: Number(formData.price),
                totalSeats: totalSeats,
                availableSeats: availableSeats,
                date: new Date(formData.date).toISOString()
            };

            if (id) {
                await updateEvent(id, formattedData);
                alert('Event updated successfully!');
            } else {
                await addEvent(formattedData);
                alert('Event created successfully!');
            }
            navigate('/events');
        } catch (error) {
            console.error('Error saving event:', error);
            setError(error.response?.data?.message || 'Failed to save event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const categories = ['Movies', 'Concerts', 'Sports'];

    return (
        <div className="edit-event-form">
            <h2 className="form-title">{id ? 'Edit Event' : 'Create New Event'}</h2>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Category</label>
                    <div className="category-options">
                        {categories.map(category => (
                            <div
                                key={category}
                                className={`category-option ${category} ${formData.category === category ? 'selected' : ''}`}
                                onClick={() => handleCategorySelect(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        name="date"
                        className="form-control"
                        value={formData.date ? formData.date.split('T')[0] : ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Time</label>
                    <input
                        type="time"
                        name="time"
                        className="form-control"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        className="form-control"
                        value={formData.venue}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Total Seats</label>
                    <input
                        type="number"
                        name="totalSeats"
                        className="form-control"
                        value={formData.totalSeats}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Available Seats</label>
                    <input
                        type="number"
                        name="availableSeats"
                        className="form-control"
                        value={formData.availableSeats}
                        onChange={handleChange}
                        required
                        min="0"
                        max={formData.totalSeats}
                    />
                </div>

                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/events')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (id ? 'Update Event' : 'Create Event')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;

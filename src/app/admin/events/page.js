"use client";

import { useState, useEffect } from 'react';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: null,
    imagePreview: null
  });

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
      } else {
        setError('Failed to fetch events');
      }
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewEvent(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.description) {
      alert('All fields are required');
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('title', newEvent.title);
      formData.append('description', newEvent.description);
      formData.append('date', newEvent.date);
      formData.append('time', newEvent.time);
      formData.append('location', newEvent.location);

      if (newEvent.image) {
        formData.append('image', newEvent.image);
      }

      const url = editingEvent ? `/api/events/${editingEvent.id}` : '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        if (editingEvent) {
          setEvents(prev => prev.map(event => 
            event.id === editingEvent.id ? data.data : event
          ));
        } else {
          setEvents(prev => [...prev, data.data]);
        }
        handleCancelEdit();
      } else {
        alert(`Failed to ${editingEvent ? 'update' : 'create'} event: ` + data.message);
      }
    } catch (err) {
      console.error(`Error ${editingEvent ? 'updating' : 'creating'} event:`, err);
      alert(`Failed to ${editingEvent ? 'update' : 'create'} event`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setEvents(prev => prev.filter(event => event.id !== id));
      } else {
        alert('Failed to delete event: ' + data.message);
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event');
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      image: null,
      imagePreview: event.image || null
    });
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: null,
      imagePreview: null
    });
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-0">Event Management</h1>
          <p className="text-muted mb-0">Create and manage church events</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingEvent(null);
            setNewEvent({
              title: '',
              date: '',
              time: '',
              location: '',
              description: '',
              image: null,
              imagePreview: null
            });
            setShowAddForm(!showAddForm);
          }}
          disabled={loading}
        >
          <i className="fas fa-plus me-2"></i>Add New Event
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">{editingEvent ? 'Edit Event' : 'Add New Event'}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddEvent}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">Event Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="date" className="form-label">Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="time" className="form-label">Time *</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="location" className="form-label">Location *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Main Sanctuary"
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    placeholder="Event description..."
                    required
                    disabled={submitting}
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="image" className="form-label">Event Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={submitting}
                  />
                  <small className="form-text text-muted">
                    Upload an image for the event (optional). Supported formats: JPG, PNG, GIF, WebP.
                  </small>
                </div>
              </div>
              {newEvent.imagePreview && (
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Image Preview:</label>
                    <div className="border rounded p-2" style={{maxWidth: '300px'}}>
                      <img
                        src={newEvent.imagePreview}
                        alt="Event preview"
                        className="img-fluid rounded"
                        style={{width: '100%', height: '200px', objectFit: 'cover'}}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success" disabled={submitting}>
                  <i className="fas fa-save me-2"></i>
                  {submitting ? (editingEvent ? 'Updating...' : 'Saving...') : (editingEvent ? 'Update Event' : 'Save Event')}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelEdit}
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Existing Events</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <p className="text-muted">No events created yet.</p>
          ) : (
            <div className="row g-4">
              {events.map(event => (
                <div key={event.id} className="col-lg-6 col-xl-4">
                  <div className="event-card bg-white rounded-3 shadow-sm h-100 overflow-hidden">
                    <div className="event-header text-center py-3" style={{background: 'linear-gradient(135deg, #d4af37, #ffd700)', color: '#2c3e50'}}>
                      <h5 className="mb-1" style={{fontWeight: '600'}}>{event.title}</h5>
                      <small style={{color: '#2c3e50', opacity: '0.8'}}>{event.date} • {event.time}</small>
                    </div>
                    <div className="event-body p-0">
                      <div className="event-banner" style={{
                        height: '200px',
                        backgroundImage: event.image ? `url(${event.image})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        ...(event.image ? {} : {
                          background: event.location === 'Main Sanctuary' ? 'linear-gradient(135deg, #667eea, #764ba2)' :
                                     event.location === 'Community Center' ? 'linear-gradient(135deg, #f093fb, #f5576c)' :
                                     'linear-gradient(135deg, #4facfe, #00f2fe)'
                        }),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {!event.image && (
                          <div className="text-center text-white">
                            <i className="fas fa-calendar-alt fa-3x mb-2" style={{opacity: '0.8'}}></i>
                            <h6 className="mb-0">{event.location}</h6>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        {event.description && (
                          <p className="text-muted mb-3" style={{fontSize: '0.9rem', lineHeight: '1.5'}}>
                            {event.description}
                          </p>
                        )}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge bg-primary">upcoming</span>
                          <small className="text-muted">ID: {event.id}</small>
                        </div>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm flex-fill" style={{
                            background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                            border: 'none',
                            color: '#2c3e50',
                            fontWeight: '500',
                            borderRadius: '20px'
                          }} onClick={() => handleEditEvent(event)}>
                            <i className="fas fa-edit me-1"></i>Edit
                          </button>
                          <button
                            className="btn btn-sm flex-fill"
                            style={{
                              background: 'transparent',
                              border: '2px solid #dc3545',
                              color: '#dc3545',
                              fontWeight: '500',
                              borderRadius: '20px'
                            }}
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <i className="fas fa-trash me-1"></i>Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
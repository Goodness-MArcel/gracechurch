"use client";

import { useState } from 'react';

export default function MinistriesManagement() {
  const [ministries, setMinistries] = useState([
    {
      id: 1,
      title: 'Children\'s Ministry',
      description: 'Nurturing young hearts with God\'s love through age-appropriate teaching, activities, and fellowship.',
      schedule: 'Sundays 9:00 AM - 10:00 AM',
      icon: 'fas fa-child',
      image: 'https://images.pexels.com/photos/395132/pexels-photo-395132.jpeg?auto=compress&cs=tinysrgb&w=800',
      coordinator: 'Sarah Johnson',
      contactEmail: 'children@graceofgodchurch.org',
      active: true
    },
    {
      id: 2,
      title: 'Youth Ministry',
      description: 'Empowering teenagers to grow in faith, build friendships, and discover their purpose in Christ.',
      schedule: 'Fridays 7:00 PM - 9:00 PM',
      icon: 'fas fa-users',
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      coordinator: 'Mike Davis',
      contactEmail: 'youth@graceofgodchurch.org',
      active: true
    },
    {
      id: 3,
      title: 'Worship Ministry',
      description: 'Leading congregational worship through music, song, and creative expression to glorify God.',
      schedule: 'Sundays & Special Services',
      icon: 'fas fa-music',
      image: 'https://images.pexels.com/photos/169490/pexels-photo-169490.jpeg?auto=compress&cs=tinysrgb&w=800',
      coordinator: 'Jennifer Lee',
      contactEmail: 'worship@graceofgodchurch.org',
      active: true
    },
    {
      id: 4,
      title: 'Outreach Ministry',
      description: 'Serving our community through food drives, volunteer work, and compassionate care for those in need.',
      schedule: 'Various Times Throughout Week',
      icon: 'fas fa-hands-helping',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
      coordinator: 'David Wilson',
      contactEmail: 'outreach@graceofgodchurch.org',
      active: true
    },
    {
      id: 5,
      title: 'Prayer Ministry',
      description: 'Interceding for our church, community, and world through dedicated prayer meetings and support.',
      schedule: 'Wednesdays 7:00 PM',
      icon: 'fas fa-praying-hands',
      image: 'https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800',
      coordinator: 'Mary Thompson',
      contactEmail: 'prayer@graceofgodchurch.org',
      active: true
    },
    {
      id: 6,
      title: 'Adult Education',
      description: 'Deepening biblical knowledge through Bible studies, discipleship classes, and spiritual growth opportunities.',
      schedule: 'Wednesdays 7:00 PM',
      icon: 'fas fa-graduation-cap',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
      coordinator: 'Pastor Robert Brown',
      contactEmail: 'education@graceofgodchurch.org',
      active: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    schedule: '',
    icon: '',
    image: null,
    imagePreview: null,
    coordinator: '',
    contactEmail: '',
    active: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMinistry) {
      setMinistries(ministries.map(ministry =>
        ministry.id === editingMinistry.id ? { ...formData, id: editingMinistry.id } : ministry
      ));
    } else {
      const newMinistry = {
        ...formData,
        image: formData.imagePreview, // Store the preview URL for display
        id: Date.now()
      };
      setMinistries([newMinistry, ...ministries]);
    }
    resetForm();
  };

  const handleEdit = (ministry) => {
    setEditingMinistry(ministry);
    setFormData(ministry);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this ministry?')) {
      setMinistries(ministries.filter(ministry => ministry.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      schedule: '',
      icon: '',
      image: null,
      imagePreview: null,
      coordinator: '',
      contactEmail: '',
      active: true
    });
    setEditingMinistry(null);
    setShowForm(false);
  };

  const toggleActive = (id) => {
    setMinistries(ministries.map(ministry =>
      ministry.id === id ? { ...ministry, active: !ministry.active } : ministry
    ));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 style={{color: '#2c3e50', fontWeight: '700'}}>Ministries Management</h1>
          <p className="text-muted">Manage church ministries and their coordinators</p>
        </div>
        <button
          className="btn"
          onClick={() => setShowForm(!showForm)}
          style={{
            background: 'linear-gradient(135deg, #d4af37, #ffd700)',
            border: 'none',
            color: '#2c3e50',
            fontWeight: '600',
            padding: '10px 20px'
          }}
        >
          <i className="fas fa-plus me-2"></i>Add Ministry
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card mb-4" style={{border: 'none', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
          <div className="card-header" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', border: 'none', borderRadius: '15px 15px 0 0'}}>
            <h5 style={{color: '#2c3e50', fontWeight: '600', margin: 0}}>
              <i className="fas fa-edit me-2" style={{color: '#d4af37'}}></i>
              {editingMinistry ? 'Edit Ministry' : 'Add New Ministry'}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Ministry Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Coordinator</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.coordinator}
                    onChange={(e) => setFormData({...formData, coordinator: e.target.value})}
                    placeholder="Ministry coordinator name"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Schedule</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.schedule}
                    onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                    placeholder="e.g., Sundays 9:00 AM - 10:00 AM"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Icon Class</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    placeholder="e.g., fas fa-child"
                  />
                  <small className="form-text text-muted">FontAwesome icon class (e.g., fas fa-child)</small>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Contact Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    placeholder="ministry@graceofgodchurch.org"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Ministry Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <small className="form-text text-muted">
                    Upload an image for the ministry (optional). Supported formats: JPG, PNG, GIF, WebP.
                  </small>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Description *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                  />
                  <label className="form-check-label" htmlFor="active" style={{color: '#2c3e50', fontWeight: '500'}}>
                    Active Ministry
                  </label>
                </div>
              </div>
              {formData.imagePreview && (
                <div className="mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Image Preview:</label>
                  <div className="border rounded p-2" style={{maxWidth: '300px'}}>
                    <img
                      src={formData.imagePreview}
                      alt="Ministry preview"
                      className="img-fluid rounded"
                      style={{width: '100%', height: '200px', objectFit: 'cover'}}
                    />
                  </div>
                </div>
              )}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                    border: 'none',
                    color: '#2c3e50',
                    fontWeight: '600',
                    padding: '10px 30px'
                  }}
                >
                  <i className="fas fa-save me-2"></i>{editingMinistry ? 'Update' : 'Save'} Ministry
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ministries List */}
      <div className="card" style={{border: 'none', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
        <div className="card-header" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', border: 'none', borderRadius: '15px 15px 0 0'}}>
          <h5 style={{color: '#2c3e50', fontWeight: '600', margin: 0}}>
            <i className="fas fa-list me-2" style={{color: '#d4af37'}}></i>All Ministries ({ministries.length})
          </h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Ministry</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Coordinator</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Schedule</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Contact</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Status</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ministries.map((ministry) => (
                  <tr key={ministry.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          {ministry.icon && <i className={`${ministry.icon} fa-lg`} style={{color: '#d4af37'}}></i>}
                        </div>
                        <div>
                          <strong style={{color: '#2c3e50'}}>{ministry.title}</strong>
                          <br />
                          <small className="text-muted">{ministry.description.substring(0, 50)}...</small>
                        </div>
                      </div>
                    </td>
                    <td style={{color: '#6c757d'}}>{ministry.coordinator}</td>
                    <td style={{color: '#6c757d'}}>{ministry.schedule}</td>
                    <td style={{color: '#6c757d'}}>{ministry.contactEmail}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${ministry.active ? 'btn-success' : 'btn-secondary'}`}
                        onClick={() => toggleActive(ministry.id)}
                      >
                        <i className={`fas ${ministry.active ? 'fa-check' : 'fa-times'}`}></i>
                      </button>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEdit(ministry)}
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(ministry.id)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
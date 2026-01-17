"use client";

import { useState } from 'react';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('about');
  const [content, setContent] = useState({
    about: {
      title: 'About Grace of God Church',
      content: 'Grace of God Church is a welcoming community dedicated to spreading God\'s love and serving our neighbors. Founded in 1995, we have been a cornerstone of faith and fellowship in our community.',
      mission: 'To spread God\'s love, serve our community, and grow in faith together.',
      vision: 'To be a beacon of hope and love in our community, welcoming all who seek spiritual growth.'
    },
    contact: {
      address: '123 Faith Street, Springfield, IL 62701',
      phone: '(555) 123-4567',
      email: 'info@graceofgodchurch.org',
      serviceTimes: 'Sunday Worship: 10:00 AM, Sunday School: 9:00 AM, Wednesday Prayer: 7:00 PM'
    },
    welcome: {
      title: 'Welcome to Grace Church',
      message: 'Experience God\'s love in a welcoming community. Join us for worship, fellowship, and spiritual growth.'
    }
  });

  const handleSave = (section) => {
    // In a real app, this would save to a database
    alert(`${section} content saved successfully!`);
  };

  const tabs = [
    { id: 'about', label: 'About Page', icon: 'fas fa-info-circle' },
    { id: 'contact', label: 'Contact Info', icon: 'fas fa-address-book' },
    { id: 'welcome', label: 'Welcome Message', icon: 'fas fa-handshake' }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 style={{color: '#2c3e50', fontWeight: '700'}}>Content Management</h1>
          <p className="text-muted">Edit and manage church website content</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="card" style={{border: 'none', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
        <div className="card-header" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', border: 'none', borderRadius: '15px 15px 0 0'}}>
          <ul className="nav nav-tabs card-header-tabs" style={{border: 'none'}}>
            {tabs.map((tab) => (
              <li key={tab.id} className="nav-item">
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    border: 'none',
                    background: activeTab === tab.id ? 'white' : 'transparent',
                    color: activeTab === tab.id ? '#2c3e50' : '#6c757d',
                    fontWeight: activeTab === tab.id ? '600' : '500'
                  }}
                >
                  <i className={`${tab.icon} me-2`}></i>{tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-body">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div>
              <h4 style={{color: '#2c3e50', fontWeight: '600'}}>About Page Content</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Page Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={content.about.title}
                    onChange={(e) => setContent({...content, about: {...content.about, title: e.target.value}})}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Mission Statement</label>
                  <input
                    type="text"
                    className="form-control"
                    value={content.about.mission}
                    onChange={(e) => setContent({...content, about: {...content.about, mission: e.target.value}})}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Main Content</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={content.about.content}
                  onChange={(e) => setContent({...content, about: {...content.about, content: e.target.value}})}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Vision Statement</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={content.about.vision}
                  onChange={(e) => setContent({...content, about: {...content.about, vision: e.target.value}})}
                ></textarea>
              </div>
              <button
                className="btn"
                onClick={() => handleSave('About')}
                style={{
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  border: 'none',
                  color: '#2c3e50',
                  fontWeight: '600',
                  padding: '10px 30px'
                }}
              >
                <i className="fas fa-save me-2"></i>Save About Content
              </button>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div>
              <h4 style={{color: '#2c3e50', fontWeight: '600'}}>Contact Information</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={content.contact.address}
                    onChange={(e) => setContent({...content, contact: {...content.contact, address: e.target.value}})}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={content.contact.phone}
                    onChange={(e) => setContent({...content, contact: {...content.contact, phone: e.target.value}})}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={content.contact.email}
                    onChange={(e) => setContent({...content, contact: {...content.contact, email: e.target.value}})}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Service Times</label>
                  <input
                    type="text"
                    className="form-control"
                    value={content.contact.serviceTimes}
                    onChange={(e) => setContent({...content, contact: {...content.contact, serviceTimes: e.target.value}})}
                  />
                </div>
              </div>
              <button
                className="btn"
                onClick={() => handleSave('Contact')}
                style={{
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  border: 'none',
                  color: '#2c3e50',
                  fontWeight: '600',
                  padding: '10px 30px'
                }}
              >
                <i className="fas fa-save me-2"></i>Save Contact Info
              </button>
            </div>
          )}

          {/* Welcome Tab */}
          {activeTab === 'welcome' && (
            <div>
              <h4 style={{color: '#2c3e50', fontWeight: '600'}}>Welcome Message</h4>
              <div className="mb-3">
                <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Hero Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={content.welcome.title}
                  onChange={(e) => setContent({...content, welcome: {...content.welcome, title: e.target.value}})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Welcome Message</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={content.welcome.message}
                  onChange={(e) => setContent({...content, welcome: {...content.welcome, message: e.target.value}})}
                ></textarea>
              </div>
              <button
                className="btn"
                onClick={() => handleSave('Welcome')}
                style={{
                  background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                  border: 'none',
                  color: '#2c3e50',
                  fontWeight: '600',
                  padding: '10px 30px'
                }}
              >
                <i className="fas fa-save me-2"></i>Save Welcome Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
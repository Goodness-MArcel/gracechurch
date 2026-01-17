"use client";

import { useState, useEffect, useCallback } from 'react';

const pageSizeOptions = [6, 12, 24];

export default function MinistriesManagement() {
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
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

  const fetchMinistries = useCallback(async (requestedPage = page, requestedPageSize = pageSize) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ministries?page=${requestedPage}&limit=${requestedPageSize}`);
      const result = await response.json();
      if (result.success) {
        setMinistries(result.data);
        const meta = result.meta || {};
        const totalItems = typeof meta.totalItems === 'number' ? meta.totalItems : result.data.length;
        const totalPagesValue = typeof meta.totalPages === 'number' && meta.totalPages > 0
          ? meta.totalPages
          : Math.max(Math.ceil(totalItems / requestedPageSize), 1);

        setTotalCount(totalItems);
        setTotalPages(totalPagesValue);

        if (meta.currentPage && meta.currentPage !== requestedPage) {
          setPage(meta.currentPage);
        }

        if (meta.pageSize && meta.pageSize !== requestedPageSize) {
          setPageSize(meta.pageSize);
        }
      }
      return result;
    } catch (error) {
      console.error('Error fetching ministries:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchMinistries(page, pageSize);
  }, [fetchMinistries, page, pageSize]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('schedule', formData.schedule || '');
      submitData.append('icon', formData.icon || '');
      submitData.append('coordinator', formData.coordinator || '');
      submitData.append('contactEmail', formData.contactEmail || '');
      submitData.append('active', formData.active.toString());

      if (formData.image) {
        submitData.append('image', formData.image);
      } else if (editingMinistry && removeExistingImage) {
        submitData.append('removeImage', 'true');
      }

      const url = editingMinistry ? `/api/ministries/${editingMinistry.id}` : '/api/ministries';
      const method = editingMinistry ? 'PUT' : 'POST';

      const response = await fetch(url, { method, body: submitData });
      const result = await response.json();

      if (result.success) {
        await fetchMinistries(page, pageSize);
        resetForm();
        alert(editingMinistry ? 'Ministry updated successfully!' : 'Ministry created successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting ministry:', error);
      alert('An error occurred while saving the ministry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (ministry) => {
    setEditingMinistry(ministry);
    setFormData({
      title: ministry.title || '',
      description: ministry.description || '',
      schedule: ministry.schedule || '',
      icon: ministry.icon || '',
      image: null,
      imagePreview: ministry.imagePath || null,
      coordinator: ministry.coordinator || '',
      contactEmail: ministry.contactEmail || '',
      active: ministry.active ?? true
    });
    setRemoveExistingImage(false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const numericId = Number.parseInt(id, 10);
    if (Number.isNaN(numericId)) {
      alert('Unable to delete this ministry because the identifier is invalid.');
      return;
    }

    if (!confirm('Are you sure you want to delete this ministry?')) return;

    try {
      const response = await fetch(`/api/ministries/${numericId}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        const fetchResult = await fetchMinistries(page, pageSize);
        if (fetchResult?.meta) {
          const metaPages = typeof fetchResult.meta.totalPages === 'number' ? fetchResult.meta.totalPages : totalPages;
          const safeTotalPages = metaPages > 0 ? metaPages : 1;
          if (page > safeTotalPages) {
            setPage(safeTotalPages);
          }
        }
        alert('Ministry deleted successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting ministry:', error);
      alert('An error occurred while deleting the ministry.');
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
    setRemoveExistingImage(false);
  };

  const toggleActive = async (id) => {
    const numericId = Number.parseInt(id, 10);
    if (Number.isNaN(numericId)) {
      alert('Unable to update status because the identifier is invalid.');
      return;
    }

    const ministry = ministries.find(item => Number.parseInt(item.id, 10) === numericId);
    if (!ministry) return;

    try {
      const updateData = new FormData();
      updateData.append('title', ministry.title || '');
      updateData.append('description', ministry.description || '');
      updateData.append('schedule', ministry.schedule || '');
      updateData.append('icon', ministry.icon || '');
      updateData.append('coordinator', ministry.coordinator || '');
      updateData.append('contactEmail', ministry.contactEmail || '');
      updateData.append('active', (!ministry.active).toString());

      const response = await fetch(`/api/ministries/${numericId}`, {
        method: 'PUT',
        body: updateData
      });

      const result = await response.json();

      if (result.success) {
        await fetchMinistries(page, pageSize);
      } else {
        alert('Error updating ministry: ' + result.message);
      }
    } catch (error) {
      console.error('Error toggling ministry state:', error);
      alert('An error occurred while updating the ministry.');
    }
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
    setRemoveExistingImage(false);
  };

  const handleRemoveExistingImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
    setRemoveExistingImage(true);
  };

  const goToPage = (newPage) => {
    if (totalCount === 0) return;
    const boundedPage = Math.min(Math.max(newPage, 1), totalPages);
    if (boundedPage !== page) {
      setPage(boundedPage);
    }
  };

  const handlePageSizeChange = (event) => {
    const newSize = Number.parseInt(event.target.value, 10);
    if (!Number.isNaN(newSize) && newSize !== pageSize) {
      setPageSize(newSize);
      setPage(1);
    }
  };

  const startIndex = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = totalCount === 0 ? 0 : Math.min(page * pageSize, totalCount);

  if (loading && ministries.length === 0 && !showForm) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
          <i className="fas fa-plus me-2"></i>{showForm ? 'Close Form' : 'Add Ministry'}
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
                  {editingMinistry && formData.imagePreview && (
                    <button
                      type="button"
                      className="btn btn-link p-0 mt-1"
                      onClick={handleRemoveExistingImage}
                    >
                      Remove current image
                    </button>
                  )}
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
                  disabled={submitting}
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #ffd700)',
                    border: 'none',
                    color: '#2c3e50',
                    fontWeight: '600',
                    padding: '10px 30px'
                  }}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>{editingMinistry ? 'Update' : 'Save'} Ministry
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                  disabled={submitting}
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
            <i className="fas fa-list me-2" style={{color: '#d4af37'}}></i>All Ministries ({totalCount})
          </h5>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
            <div>
              <small className="text-muted">
                {totalCount === 0 ? 'No ministries available' : `Showing ${startIndex}-${endIndex} of ${totalCount}`}
              </small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <label className="form-label m-0" style={{color: '#2c3e50', fontWeight: '500'}}>Rows per page</label>
              <select
                className="form-select form-select-sm"
                value={pageSize}
                onChange={handlePageSizeChange}
                style={{width: 'auto'}}
              >
                {pageSizeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
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
                {ministries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      {loading ? 'Loading ministries...' : 'No ministries found.'}
                    </td>
                  </tr>
                ) : (
                  ministries.map((ministry) => {
                    const summary = ministry.description
                      ? (ministry.description.length > 60
                        ? `${ministry.description.substring(0, 57)}...`
                        : ministry.description)
                      : 'No description provided';

                    return (
                      <tr key={ministry.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="me-3">
                              {ministry.icon && <i className={`${ministry.icon} fa-lg`} style={{color: '#d4af37'}}></i>}
                            </div>
                            <div>
                              <strong style={{color: '#2c3e50'}}>{ministry.title}</strong>
                              <br />
                              <small className="text-muted">{summary}</small>
                            </div>
                          </div>
                        </td>
                        <td style={{color: '#6c757d'}}>{ministry.coordinator || '—'}</td>
                        <td style={{color: '#6c757d'}}>{ministry.schedule || '—'}</td>
                        <td style={{color: '#6c757d'}}>{ministry.contactEmail || '—'}</td>
                        <td>
                          <button
                            className={`btn btn-sm ${ministry.active ? 'btn-success' : 'btn-secondary'}`}
                            onClick={() => toggleActive(ministry.id)}
                            disabled={loading}
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1 || totalCount === 0}
            >
              <i className="fas fa-chevron-left me-1"></i>Previous
            </button>
            <span className="text-muted">
              {totalCount === 0 ? 'Page 1 of 1' : `Page ${page} of ${totalPages}`}
            </span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages || totalCount === 0}
            >
              Next<i className="fas fa-chevron-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
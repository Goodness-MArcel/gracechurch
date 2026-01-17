"use client";

import { useState, useEffect, useCallback } from 'react';

export default function SermonsManagement() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const pageSizeOptions = [5, 10, 20];
  const [editingSermon, setEditingSermon] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    date: '',
    scripture: '',
    duration: '',
    description: '',
    audioUrl: '',
    videoUrl: '',
    featured: false,
    image: null,
    imagePreview: null,
    audioFile: null
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchSermons = useCallback(async (requestedPage = page, requestedPageSize = pageSize) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/sermons?page=${requestedPage}&limit=${requestedPageSize}`);
      const result = await response.json();
      if (result.success) {
        setSermons(result.data);
        const meta = result.meta || {};
        const computedTotalItems = typeof meta.totalItems === 'number' ? meta.totalItems : result.data.length;
        const computedTotalPages = typeof meta.totalPages === 'number' ? meta.totalPages : 1;
        if (meta.currentPage && meta.currentPage !== page) {
          setPage(meta.currentPage);
        }
        if (meta.pageSize && meta.pageSize !== pageSize) {
          setPageSize(meta.pageSize);
        }
        setTotalCount(computedTotalItems);
        setTotalPages(computedTotalPages > 0 ? computedTotalPages : 1);
      }
      return result;
    } catch (error) {
      console.error('Error fetching sermons:', error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  // Fetch sermons when pagination settings change
  useEffect(() => {
    fetchSermons(page, pageSize);
  }, [fetchSermons, page, pageSize]);

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    const newSize = Number.parseInt(event.target.value, 10);
    if (!Number.isNaN(newSize)) {
      setPageSize(newSize);
      setPage(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('speaker', formData.speaker);
      submitData.append('date', formData.date);
      submitData.append('scripture', formData.scripture || '');
      submitData.append('duration', formData.duration || '');
      submitData.append('description', formData.description);
      submitData.append('videoUrl', formData.videoUrl || '');
      submitData.append('featured', formData.featured.toString());

      if (formData.image) {
        submitData.append('image', formData.image);
      }

      if (formData.audioFile) {
        submitData.append('audio', formData.audioFile);
      }

      const url = editingSermon ? `/api/sermons/${editingSermon.id}` : '/api/sermons';
      const method = editingSermon ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: submitData
      });

      const result = await response.json();

      if (result.success) {
        await fetchSermons(page, pageSize); // Refresh the list
        resetForm();
        alert(editingSermon ? 'Sermon updated successfully!' : 'Sermon created successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting sermon:', error);
      alert('An error occurred while saving the sermon.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (sermon) => {
    setEditingSermon(sermon);
    setFormData({
      title: sermon.title,
      speaker: sermon.speaker,
      date: sermon.date.split('T')[0], // Format for date input
      scripture: sermon.scripture || '',
      duration: sermon.duration || '',
      description: sermon.description,
      audioUrl: sermon.audioPath || '',
      videoUrl: sermon.videoUrl || '',
      featured: sermon.featured,
      image: null,
      imagePreview: sermon.image,
      audioFile: null
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return;

    const numericId = Number.parseInt(id, 10);
    if (Number.isNaN(numericId)) {
      alert('Unable to delete sermon because its id is invalid. Please refresh and try again.');
      return;
    }

    try {
      const response = await fetch(`/api/sermons/${numericId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        const result = await fetchSermons(page, pageSize); // Refresh the list
        if (result?.meta) {
          const metaTotalPages = typeof result.meta.totalPages === 'number' ? result.meta.totalPages : 0;
          const safeTotalPages = metaTotalPages > 0 ? metaTotalPages : 1;
          if (page > safeTotalPages) {
            setPage(safeTotalPages);
          }
        }
        alert('Sermon deleted successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting sermon:', error);
      alert('An error occurred while deleting the sermon.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      speaker: '',
      date: '',
      scripture: '',
      duration: '',
      description: '',
      audioUrl: '',
      videoUrl: '',
      featured: false,
      image: null,
      imagePreview: null,
      audioFile: null
    });
    setEditingSermon(null);
    setShowForm(false);
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

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        audioFile: file
      }));
    }
  };

  const toggleFeatured = async (id) => {
    try {
      const numericId = Number.parseInt(id, 10);
      if (Number.isNaN(numericId)) {
        alert('Unable to update featured status because the sermon id is invalid.');
        return;
      }

      const sermon = sermons.find(s => Number.parseInt(s.id, 10) === numericId);
      if (!sermon) return;

      const updateData = new FormData();
      updateData.append('title', sermon.title);
      updateData.append('speaker', sermon.speaker);
      updateData.append('date', sermon.date.split('T')[0]);
      updateData.append('scripture', sermon.scripture || '');
      updateData.append('duration', sermon.duration || '');
      updateData.append('description', sermon.description);
      updateData.append('videoUrl', sermon.videoUrl || '');
      updateData.append('featured', (!sermon.featured).toString());

      const response = await fetch(`/api/sermons/${numericId}`, {
        method: 'PUT',
        body: updateData
      });

      const result = await response.json();

      if (result.success) {
        await fetchSermons(page, pageSize); // Refresh the list
      } else {
        alert('Error updating featured status: ' + result.message);
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
      alert('An error occurred while updating the sermon.');
    }
  };

  // Helper function to extract YouTube video ID
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const startIndex = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = totalCount === 0 ? 0 : Math.min(page * pageSize, totalCount);

  if (loading) {
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
          <h1 style={{color: '#2c3e50', fontWeight: '700'}}>Sermons Management</h1>
          <p className="text-muted">Upload and manage sermon recordings</p>
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
          <i className="fas fa-plus me-2"></i>Add Sermon
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card mb-4" style={{border: 'none', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
          <div className="card-header" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', border: 'none', borderRadius: '15px 15px 0 0'}}>
            <h5 style={{color: '#2c3e50', fontWeight: '600', margin: 0}}>
              <i className="fas fa-edit me-2" style={{color: '#d4af37'}}></i>
              {editingSermon ? 'Edit Sermon' : 'Add New Sermon'}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Speaker *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.speaker}
                    onChange={(e) => setFormData({...formData, speaker: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Scripture</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.scripture}
                    onChange={(e) => setFormData({...formData, scripture: e.target.value})}
                    placeholder="e.g., John 3:16"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g., 35 minutes"
                  />
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
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Audio File</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="audio/*"
                    onChange={handleAudioChange}
                  />
                  <small className="form-text text-muted">
                    Upload MP3, WAV, or other audio files (max 50MB). Leave empty to keep existing audio.
                  </small>
                  {editingSermon && formData.audioUrl && (
                    <small className="form-text text-success">
                      Current audio: {formData.audioUrl.split('/').pop()}
                    </small>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>YouTube Video URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
                  />
                  <small className="form-text text-muted">
                    Paste any YouTube URL - we'll handle the embed automatically.
                  </small>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <label className="form-check-label" htmlFor="featured" style={{color: '#2c3e50', fontWeight: '500'}}>
                    Featured Sermon
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Sermon Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <small className="form-text text-muted">
                  Upload an image for the sermon (optional). Supported formats: JPG, PNG, GIF, WebP.
                </small>
              </div>
              {formData.imagePreview && (
                <div className="mb-3">
                  <label className="form-label" style={{color: '#2c3e50', fontWeight: '600'}}>Image Preview:</label>
                  <div className="border rounded p-2" style={{maxWidth: '300px'}}>
                    <img
                      src={formData.imagePreview}
                      alt="Sermon preview"
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
                      <i className="fas fa-save me-2"></i>{editingSermon ? 'Update' : 'Save'} Sermon
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

      {/* Sermons List */}
      <div className="card" style={{border: 'none', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
        <div className="card-header" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', border: 'none', borderRadius: '15px 15px 0 0'}}>
          <h5 style={{color: '#2c3e50', fontWeight: '600', margin: 0}}>
            <i className="fas fa-list me-2" style={{color: '#d4af37'}}></i>All Sermons ({totalCount})
          </h5>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
            <div>
              <small className="text-muted">
                {totalCount === 0 ? 'No sermons available' : `Showing ${startIndex}-${endIndex} of ${totalCount}`}
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
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Title</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Speaker</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Date</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Duration</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Featured</th>
                  <th style={{color: '#2c3e50', fontWeight: '600'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sermons.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No sermons found.
                    </td>
                  </tr>
                ) : (
                  sermons.map((sermon) => (
                    <tr key={sermon.id}>
                      <td>
                        <div>
                          <strong style={{color: '#2c3e50'}}>{sermon.title}</strong>
                          {sermon.scripture && (
                            <small className="text-muted d-block">{sermon.scripture}</small>
                          )}
                        </div>
                      </td>
                      <td style={{color: '#6c757d'}}>{sermon.speaker}</td>
                      <td style={{color: '#6c757d'}}>{new Date(sermon.date).toLocaleDateString()}</td>
                      <td style={{color: '#6c757d'}}>{sermon.duration}</td>
                      <td>
                        <button
                          className={`btn btn-sm ${sermon.featured ? 'btn-warning' : 'btn-outline-secondary'}`}
                          onClick={() => toggleFeatured(sermon.id)}
                        >
                          <i className={`fas ${sermon.featured ? 'fa-star' : 'fa-star-o'}`}></i>
                        </button>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleEdit(sermon)}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(sermon.id)}
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
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
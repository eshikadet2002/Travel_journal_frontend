import React, { useState } from 'react';
import { Container, Form, Button, Alert, Image } from 'react-bootstrap';

function JournalManager() {
  const [formData, setFormData] = useState({
    photo: '',
    location: '',
    experience: '',
    status: 'public'
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiBase = 'http://localhost:5000/api/journals';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async () => {
    const { photo, location, experience, status } = formData;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId) {
      setError('User not authenticated. Please login again.');
      return;
    }

    if (!photo || !location || !experience) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch(
        editingId ? `${apiBase}/${editingId}` : apiBase,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ...formData, userId })
        }
      );

      if (!response.ok) throw new Error('Failed to save entry.');

      setFormData({ photo: '', location: '', experience: '', status: 'public' });
      setEditingId(null);
      setError('');
      setSuccess('Journal entry saved successfully.');
    } catch (err) {
      setError('Failed to save entry.');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">
        {editingId ? 'Edit Journal Entry' : 'Add Journal Entry'}
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </Form.Group>

        {formData.photo && (
          <div className="mb-3 text-center">
            <Image
              src={formData.photo}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+URL';
              }}
              rounded
              fluid
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="Describe your travel experience"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="draft">Draft</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleAddOrUpdate}>
          {editingId ? 'Update Entry' : 'Add Entry'}
        </Button>

        {editingId && (
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => {
              setEditingId(null);
              setFormData({ photo: '', location: '', experience: '', status: 'public' });
            }}
          >
            Cancel
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default JournalManager;

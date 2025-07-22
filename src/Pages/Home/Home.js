import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

function JournalManager() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    photo: '',
    location: '',
    experience: '',
    status: 'public'
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const apiBase = 'http://localhost:5000/api/journals';

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch(apiBase);
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      setError('Error fetching journal entries.');
    }
  };

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
     console.log('Submitting entry with userId:', userId);

    if (!photo || !location || !experience) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch(
        editingId ? `${apiBase}/${editingId}` : apiBase,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
           },

          body: JSON.stringify({ ...formData, userId })
        }
      );

      if (!response.ok) throw new Error('Failed to save entry.');

      setFormData({ photo: '', location: '', experience: '', status: 'public' });
      setEditingId(null);
      setError('');
      fetchEntries();
    } catch (err) {
      setError('Failed to save entry.');
    }
  };

  const handleEdit = (entry) => {
    setFormData({
      photo: entry.photo,
      location: entry.location,
      experience: entry.experience,
      status: entry.status
    });
    setEditingId(entry._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      fetchEntries();
    } catch (err) {
      setError('Failed to delete entry.');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">
        {editingId ? 'Edit Journal Entry' : 'Add Journal Entry'}
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}

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

      <hr className="my-4" />

      <h3 className="mb-3">Journal Entries</h3>
      <Row>
        {entries.map((entry) => (
          <Col md={6} lg={4} key={entry._id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={entry.photo} alt={entry.location} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{entry.location}</Card.Title>
                <Card.Text>{entry.experience}</Card.Text>
                <Card.Text><strong>Status:</strong> {entry.status}</Card.Text>
                <small className="text-muted">{new Date(entry.createdAt).toLocaleDateString()}</small>
                <div className="mt-3 d-flex justify-content-between">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(entry)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(entry._id)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default JournalManager;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

function JournalList() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const apiBase = 'http://localhost:5000/api/journals';

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(apiBase);
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to fetch journal entries.');
      }
    };
    fetchEntries();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">All Journal Entries</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <Col md={6} lg={4} key={entry._id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={entry.photo}
                  alt={entry.location}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{entry.location}</Card.Title>
                  <Card.Text>{entry.experience}</Card.Text>
                  <Card.Text><strong>Status:</strong> {entry.status}</Card.Text>
                  <small className="text-muted">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No journal entries found.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default JournalList;

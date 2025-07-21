import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button, Row, Col, Modal, Form } from "react-bootstrap";

const App = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      photo: "https://via.placeholder.com/300x200",
      location: "Paris, France",
      experience: "Saw the Eiffel Tower and ate delicious pastries!"
    },
    {
      id: 2,
      photo: "https://via.placeholder.com/300x200",
      location: "Kyoto, Japan",
      experience: "Visited beautiful temples and enjoyed sushi."
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEditClick = (entry) => {
    setCurrentEntry(entry);
    setShowModal(true);
  };

  const handleSave = () => {
    setEntries(entries.map(entry => 
      entry.id === currentEntry.id ? currentEntry : entry
    ));
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🌍 My Travel Diary</h2>
      <Row>
        {entries.map((entry) => (
          <Col md={4} key={entry.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={entry.photo} />
              <Card.Body>
                <Card.Title>{entry.location}</Card.Title>
                <Card.Text>{entry.experience}</Card.Text>
                <Button variant="primary" className="me-2" onClick={() => handleEditClick(entry)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(entry.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Travel Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEntry && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEntry.photo}
                  onChange={(e) =>
                    setCurrentEntry({ ...currentEntry, photo: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEntry.location}
                  onChange={(e) =>
                    setCurrentEntry({ ...currentEntry, location: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={currentEntry.experience}
                  onChange={(e) =>
                    setCurrentEntry({ ...currentEntry, experience: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
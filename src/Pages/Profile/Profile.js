import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Spinner, Form } from "react-bootstrap";

const Profile = () => {
  const userId = "123456"; // Replace with dynamic user ID logic (e.g., from auth context)
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <p>User not found</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150"
              alt="Profile Picture"
              className="rounded-circle mx-auto mt-4"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <Card.Body>
              {isEditing ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      name="bio"
                      value={user.bio}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="success" onClick={handleSave} className="me-2">
                    Save
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>{user.bio}</Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {user.email}
                  </Card.Text>
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

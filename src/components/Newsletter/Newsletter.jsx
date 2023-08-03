import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import {Button, Title} from '../products/cardstyled'
const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '' });
  };

  return (
    <div className="py-5 my-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit} className="border p-5 rounded-5">
              <Title className="text-center mb-4">İletişim</Title>
              <Form.Group controlId="email">
                <Form.Label>E-posta Adresiniz</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="info" className='my-3'>
                <Form.Label>Görüş ve Önerileriniz</Form.Label>
                <Form.Control
                  type="text"
                  name="info"
                  value={formData.info}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" block className='my-3'>
                Gönder
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Newsletter;

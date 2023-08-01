import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Title} from '../products/cardstyled'
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Serpil Öztürk',
      testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus justo et dignissim euismod. Nulla facilisi.',
    },
    {
      id: 2,
      name: 'Burcu Türkmen',
      testimonial: 'Fusce vel dui eu mauris facilisis posuere in nec arcu. Quisque vel nunc eu metus tincidunt congue a ut metus.',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      testimonial: 'Duis malesuada justo a erat euismod, vel gravida felis dictum. Pellentesque sit amet odio in elit rhoncus ullamcorper.',
    },
  ];

  return (
    <div className="bg-light py-5">
      <Container>
        <Title className="text-center mb-4">Müşteri Görüşleri</Title>
        <Row>
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} md={4} className="mb-4">
              <div className="bg-white p-3 shadow">
                <p className="mb-3">{testimonial.testimonial}</p>
                <p className="font-weight-bold mb-0">{testimonial.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Testimonials;

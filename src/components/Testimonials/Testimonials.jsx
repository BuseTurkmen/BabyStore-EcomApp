import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Title} from '../products/cardstyled'
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Burcu Türkmen',
      testimonial: '"Bu sitede yaptığım alışverişlerde müşteri memnuniyeti odaklı hizmetle karşılaştım. Ürünler sorunsuz teslim edildi ve çok memnun kaldım." ',
    },
    {
      id: 2,
      name: 'Sevgi Öztürk',
      testimonial: '"Bebeğimin sağlık ve güvenliği benim için en önemli öncelik. Buradan aldığım bebek güvenlik ürünleriyle içim rahat. Teşekkür ederim!" ',
    },
    {
      id: 3,
      name: 'İsmail Sabri',
      testimonial: '"Bebeğim için ihtiyacım olan tüm ürünleri bu siteden alıyorum. Ürünler kaliteli, fiyatlar uygun ve kargo hızı harika. Kesinlikle güvenilir bir alışveriş platformu!"',
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

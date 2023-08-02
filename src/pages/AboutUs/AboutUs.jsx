import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import foto4 from '../../resimler/foto4.jpg'
import {Title } from '../../components/products/cardstyled';

const AboutUs = () => {
  return (
    <Container className='my-5'>
      <Title className='my-5'>Hakkımızda</Title>
      <Row>
        <Col sm={12} md={6} className='text-center'>
          <img src={foto4} alt='aboutus' className='img-fluid' />
        </Col>
        <Col sm={12} md={6} className='my-5'>
          <div className="text-justify">
            <p>
              Baby Store olarak, bebek ve çocukların sağlıklı büyüme ve gelişim süreçlerine destek olmayı
              misyon edindik. Kaliteli ve güvenilir ürünleri uygun fiyatlarla müşterilerimize sunarak,
              ebeveynlerin bebekleri için en iyi ürünlere ulaşmalarını sağlamak amacımızdır.
            </p>
          </div>
          <div>
            <p >
              Vizyonumuz, bebek ve çocukların ihtiyaçlarına uygun geniş bir ürün yelpazesi sunarak
              müşterilerimizin güvenini kazanmak ve Türkiye'nin önde gelen bebek ürünleri tedarikçisi
              olmaktır. Müşteri memnuniyetini en üst düzeyde tutmak ve çocukların sağlıklı bir geleceğe
              adım atmalarına katkıda bulunmak temel hedefimizdir.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;

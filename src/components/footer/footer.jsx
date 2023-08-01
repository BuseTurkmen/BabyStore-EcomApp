import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../resimler/logo.PNG'
import { Link } from 'react-router-dom';
import { FaBabyCarriage } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light">
      <Container className="py-4">
        <Row>
          <Col xs={12} md={6} lg={3} className="text-center">
            <img src={logo} alt='BabyStore'/>
            <p>Bebek ve çocuk ürünleri konusunda Türkiye'nin önde gelen e-ticaret platformudur. Geniş ürün yelpazesi ve kaliteli hizmet anlayışıyla annelerin ve babaların yanındayız.</p>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h5>Ürünlerimiz</h5>
            <ul className="list-unstyled">
              <li>Bebek Giyim</li>
              <li>Bebek Oyuncakları</li>
              <li>Bebek Ayakkabıları</li>
              <li>Bebek Arabaları</li>
              <li>Bebek Biberonları</li>
              <li>Bebek Emzikleri</li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h5>Müşteri Hizmetleri</h5>
            <ul className="list-unstyled">
              <li>Sipariş Takibi</li>
              <li>İade ve Değişim</li>
              <li>Sıkça Sorulan Sorular</li>
              <li>İletişim</li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h5>İletişim</h5>
            <p>Adres: BabyStore Mahallesi, BabyStore Caddesi No: 123, İstanbul</p>
            <p>Telefon: 0 (111) 111 11 11</p>
            <p>E-posta: info@bebekstore.com</p>
          </Col>
        </Row>
      </Container>
      <div className="bg-danger text-center text-white py-2">
        <Container>
          <p>&copy;{new Date().getFullYear()}   <FaBabyCarriage/> BabyStore -  Buse Türkmen</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

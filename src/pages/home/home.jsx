import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../../firebase/firebase";
import { Card, Col, Row, Container, Carousel } from 'react-bootstrap';
import { collection, getDocs } from "firebase/firestore";
import { FaArrowRight } from 'react-icons/fa';
import Testimonials from '../../components/Testimonials/Testimonials'
import Newsletter from '../../components/Newsletter/Newsletter'
import {Button, CardText, CardTitle, CardPrice, Title, HomeButton, Img, Picture, Section } from '../../components/products/cardstyled';


const Home = () => {
  const [randomProducts, setRandomProducts] = useState([]); 
  const [products, setProducts] = useState([]); 

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(newData);

      const shuffledProducts = newData.sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, 8);

      setRandomProducts(selectedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Carousel>
        <Carousel.Item>
           <img
            className="d-block w-100"
            src="https://smoochbabies.com/cdn/shop/files/Untitled-4-02_40376124-3212-4d7d-9d9b-25e880c3abaf.png?v=1679935341"
            alt="First slide"
          />
          <Carousel.Caption style={{color:'#931b26'}}>
            <h3>ALIŞVERİŞE BAŞLA!</h3>
            <Link to={`/products`}>
              <Button>Ürünler</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://battattoys.com/wp-content/uploads/2022/11/slider_BT2703-curiocity.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            {/* <h3>OYUNCAKLARDA 30% İNDİRİM</h3> */}
            <Link to={`/products`}>
              <Button>EN YENİ OYUNCAKLAR BURADA</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.zazu-kids.com/wp-content/uploads/2021/07/LIZ-Slider-2400x840-1.jpg"
            alt="Third slide"
          />
          <Carousel.Caption style={{color:'#003a8f'}}>
            <h3>TÜM BEBEK KIYAFETLERİNDE 30% İNDİRİM !</h3>
            {/* <Link to={`/products`}>
              <button>Ürünler</button>
            </Link> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="container my-5">
        <Row className='my-5'>
          {/* <h2>KATEGORİLER</h2> */}
          <Col xs={6} md={2}>
            <img
              className="img-fluid bg-success"
              src="http://demo.themepiko.com/kidstore/wp-content/uploads/2019/06/cat-4.png"
              alt="Category 1"
            />
          </Col>
          <Col xs={6} md={2}>
            <img
              className="img-fluid bg-info"
              src="http://demo.themepiko.com/kidstore/wp-content/uploads/2019/06/cat-1.png"
              alt="Category 2"
            />
          </Col>
          <Col xs={6} md={2}>
            <img
              className="img-fluid bg-danger"
              src="http://demo.themepiko.com/kidstore/wp-content/uploads/2019/06/cat-6.png"
              alt="Category 3"
            />
          </Col>
          <Col xs={6} md={2}>
            <img
              className="img-fluid bg-primary"
              src="http://demo.themepiko.com/kidstore/wp-content/uploads/2019/06/cat-2.png"
              alt="Category 4"
            />
          </Col>
          <Col xs={6} md={2}>
            <img
              className="img-fluid bg-warning"
              src="http://demo.themepiko.com/kidstore/wp-content/uploads/2019/06/cat-3.png"
              alt="Category 5"
            />
          </Col>

          <Col xs={6} md={2}>
            <img
              className="img-fluid bg-secondary"
              src="http://demo.themepiko.com/kidstore/wp-content/uploads/2019/06/cat-5.png"
              alt="Category 6"
            />
          </Col>
        </Row>
      </div>
      <Container className="my-5 ">
        <Row>
          <Col xs={12} sm={6} md={8}>
            <Title className="my-4">ÜRÜNLER</Title>
          </Col>
          <Col xs={12} sm={6} md={4} className="d-flex align-items-center justify-content-end">
            <Link to={`/products`}>
              <HomeButton><FaArrowRight /></HomeButton>
            </Link>
          </Col>
        </Row>
        <Row>
          {randomProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ marginBottom: "16px"}} className="bg-white shadow text-center">
                <Card.Body>
                  <img src={product.picture} alt='' style={{width:"100%"}}/>
                  <CardTitle>
                    {product.name}              
                  </CardTitle>
                  <CardText>{product.category}</CardText>
                  <CardPrice>{product.price} TL</CardPrice>
                </Card.Body>
                <Link to={`/products/${product.id}`} className="mb-2">
                  <Button>İncele</Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
        <Section>
        <Row className="my-5 d-flex align-items-center;">
        <Col xs={12} md={5} className="mb-4 mb-md-0">
          <Picture
            src="https://media.istockphoto.com/id/1097258406/photo/little-boy-having-fun-and-playing-wooden-toy-drum.jpg?s=612x612&w=0&k=20&c=WFaZsdS3mlOB_bMcSEOyY7OnROp61cu3SrbZ0o7luf8="
            alt="Resim"
            className="img-fluid"
          />
        </Col>
        <Col xs={12} md={4} className="d-flex flex-column justify-content-center tex-align-center" >
          <h4 className="mb-4 text-center">Biberon ve Oyuncaklardaki Yeni Ürünlere Göz Atın</h4>
          <Link to="/products"className="d-flex justify-content-center">
            <Button className="btn btn-primary mt-3 text-center"><FaArrowRight /></Button>
          </Link>
        </Col>
        <Col xs={12} md={3} className="mb-4 mb-md-0">
          <Img
            src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-product-img-5.jpg"
            alt="Resim"
            className="img-fluid"
          />
        </Col>
      </Row>
      </Section>
      {/* <Col xs={12} md={6} className="mb-4 mb-md-0">
        <img
        src="http://demo.themepiko.com/kidstore/wp-content/uploads/2019/09/06.gif"
        alt="Resim"
        className="img-fluid"
        />
      </Col> */}
      <Testimonials />
      <Newsletter />
      </Container>
    </div>
  );
};

export default Home;


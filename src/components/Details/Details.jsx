import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../../firebase/firebase";
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { Carousel, Container, Row, Col, Form, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { CardText, CardTitle, CardPrice, Button } from '../products/cardstyled';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productRef = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          setProduct({ id: productId, ...productSnapshot.data() });
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const fetchRandomProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const shuffledProducts = newData.sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, 8);

      setRandomProducts(selectedProducts);
    } catch (error) {
      console.error('Error fetching random products:', error);
    }
  };

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);
    if (!isProductInCart) {
      try {
        await addDoc(collection(db, "basket"), product);
        setCartItems([...cartItems, product]);
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, product]));
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  const addToFavorite = async (product) => {
    const isProductInFavorite = cartItems.some((item) => item.id === product.id);
    if (!isProductInFavorite) {
      try {
        await addDoc(collection(db, "favorites"), product);
        setCartItems([...cartItems, product]);
        // localStorage.setItem('cartItems', JSON.stringify([...cartItems, product]));
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <Container>
      {product ? (
        <>
          <Row className='my-5'>
            <Col xs={12} md={6} className="carousel-container">
              <Carousel style={{ width: 'max-content' }}>
                {[...Array(4)].map((_, index) => (
                  <Carousel.Item key={index}>
                    <img src={product.picture} alt={product.name} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col xs={12} md={6}>
              <CardTitle>{product.name}</CardTitle>
              <CardText>{product.category}</CardText>
              <CardText>{product.description}</CardText>
              <CardPrice>{product.price} TL</CardPrice>
              <Link className='d-flex'>
                <FaHeart 
                onClick={() => addToFavorite(product)}
                style={{color:'pink'}}
                />
              </Link>
              <Button onClick={() => addToCart(product)}>Sepete Ekle</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='mt-5'>
              <h4>Kullanıcı Yorumları</h4>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
              <Form onSubmit={handleCommentSubmit}>
                <Form.Group controlId="commentInput" className='d-flex'>
                  {/* <Form.Label>Yorum Yap</Form.Label> */}
                  <Form.Control
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button type="submit">Gönder</Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='my-5'>
              <h4>Diğer Ürünler</h4>
              <Row className='mt-4'>
                {randomProducts.map((product) => (
                  <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ marginBottom: "16px" }} className="bg-white shadow text-center">
                      <Card.Body>
                        <img src={product.picture} alt="" style={{ width: "100%" }} />
                        <CardTitle>
                          {product.name}
                        </CardTitle>
                        <CardText>{product.category}</CardText>
                        <CardPrice>{product.price} TL</CardPrice>
                      </Card.Body>
                      <Link to={`/products/${product.id}`} className='mb-3'>
                        <Button>İncele</Button>
                      </Link>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default ProductDetailPage;

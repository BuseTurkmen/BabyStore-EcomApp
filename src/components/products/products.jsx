import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../../firebase/firebase";
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FaHeart } from 'react-icons/fa';
import {Button, CardText, CardTitle, CardPrice} from './cardstyled';
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/slice/productsReducer";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setProducts(newData));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = products.filter((product) => {
      if (selectedCategory === 'all') {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return (
          product.category.toLowerCase().includes(selectedCategory.toLowerCase()) &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });

    switch (sortOption) {
      case 'azdan-coka':
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'coktan-aza':
        filteredData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'a-z':
        filteredData.sort((a, b) => a.price - b.price);
        break;
      case 'z-a':
        filteredData.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filteredData);
  }, [products, searchTerm, selectedCategory, sortOption]);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);
    if (!isProductInCart) {
      try {
        await addDoc(collection(db, "basket"), product);
        setCartItems([...cartItems, product]);
      } catch (error) {
        console.error('Hata:', error);
      }
    }
  };

  const addToFavorite = async (product) => {
    const isProductInFavorite = cartItems.some((item) => item.id === product.id);
    if (!isProductInFavorite) {
      try {
        await addDoc(collection(db, "favorites"), product);
        setCartItems([...cartItems, product]);
      } catch (error) {
        console.error('hata:', error);
      }
    }
  };
  
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <Container>
      <Row className='mb-5'>
        <Col xs={12} style={{marginBottom: '25px' }}>
          <Form.Group controlId="searchInput" className='my-3'>
            <Form.Control
              type="text"
              placeholder="Ürün adı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="categorySelect" className='my-3'>
            <Form.Label>Kategoriye göre filtrele:</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Hepsi</option>
              <option value="Bebek Giyim">Bebek Giyim</option>
              <option value="Ayakkabı">Ayakkabı</option>
              <option value="Oyuncak">Oyuncak</option>
              <option value="Biberon">Biberon</option>
              <option value="Emzik">Emzik</option>
              <option value="Yürüteç">Yürüteç</option>
              <option value="Bebek Arabası">Bebek Arabası</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="sortSelect" className='my-3'>
            <Form.Label>Ürünleri sırala:</Form.Label>
            <Form.Control
              as="select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Varsayılan</option>
              <option value="azdan-coka">A-Z</option>
              <option value="coktan-aza">Z-A</option>
              <option value="a-z">Fiyat Artan</option>
              <option value="z-a">Fiyat Azalan</option>
            </Form.Control>
          </Form.Group>
        </Col>
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ marginBottom: "16px"}} className="bg-white shadow text-center" to={`/products/${product.id}`}>
              <Card.Body>
                <img src={product.picture} alt='' style={{width:"100%"}}/>
                <CardTitle >
                  {product.name}              
                </CardTitle>
                <CardText>{product.category}</CardText>
                <CardPrice>{product.price} TL</CardPrice>
              </Card.Body>
              <div className='mb-3'>
              <Link to={`/products/${product.id}`}>
                <Button>İncele</Button>
              </Link>
              <Link>
                <FaHeart 
                style={{color:'pink'}}
                onClick={() => addToFavorite(product)}/>
              </Link>
              <Button onClick={() => addToCart(product)}>Sepete Ekle</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row> 
    </Container>
  );
};

export default Products;

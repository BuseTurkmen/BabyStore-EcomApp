import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import foto6 from '../../resimler/foto6.jpg'
import {Button, CardText, CardTitle, CardPrice, FavoriPict} from '../../components/products/cardstyled';
import { FaTrash } from 'react-icons/fa';

const Favorites = () => {
  const [favoritesItems, setFavoritesItems] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'favorites'));
      const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFavoritesItems(newData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []); 

  const handleDelete = async (id) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'favorites'));
      const documentToDelete = querySnapshot.docs.find((doc) => doc.data().id === id);
      if (!documentToDelete) {
        console.error('Belge bulunamadı:', id);
        return;
      }
      await deleteDoc(documentToDelete.ref);
      console.log('Belge başarıyla silindi:', id);
    } catch (error) {
      console.error('Hata oluştu:', error);
      return;
    }
    setFavoritesItems((prevFavorites) => prevFavorites.filter((item) => item.id !== id));
  };
  

  return (
    <div className="container mt-4">
      <div className='mx-auto' >
        <FavoriPict
        alt='foto'
        src={foto6}
        />
      </div>
      <h1>Favoriler</h1>
      <div className="row my-4">
        {favoritesItems.map ((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ marginBottom: "16px"}} >
              <Card.Body className='text-center'>
                <img src={product.picture} alt={product.name} style={{ width: "100%" }}/>
                <CardTitle>{product.name}</CardTitle>
                <CardText>{product.category}</CardText>
                <CardPrice>{product.price} TL</CardPrice>
              </Card.Body>
              <div className='mx-3 my-3'>
              <Link to={`/products/${product.id}`}>
                <Button>İncele</Button>
              </Link>
              <Link> 
                <FaTrash onClick={() => handleDelete(product.id)}/>
              </Link>
              <Button variant="success" onClick={() => addToCart(product)}>Sepete Ekle</Button>
              </div>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

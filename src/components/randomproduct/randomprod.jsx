import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { db } from "../../firebase/firebase";

const RandomProductsCard = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await db.collection('products').get();
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(newData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRandomIndexes = (totalItems, itemsToSelect) => {
    const indexes = new Set();
    while (indexes.size < itemsToSelect) {
      indexes.add(Math.floor(Math.random() * totalItems));
    }
    return Array.from(indexes);
  };

  const randomIndexes = getRandomIndexes(products.length, 8);
  const randomProducts = randomIndexes.map((index) => products[index]);

  return (
    <Row>
      {randomProducts.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card style={{ marginBottom: "16px"}} className="bg-white shadow">
            <Card.Body>
              <img src={product.picture} alt='' style={{width:"100%"}}/>
              <Card.Title>
                {product.name}              
              </Card.Title>
              <Card.Text>{product.category}</Card.Text>
              <Card.Text>{product.price} TL</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RandomProductsCard;


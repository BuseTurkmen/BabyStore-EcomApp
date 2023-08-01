import React from "react";
import Products from "../../components/products/products";
import {Col } from 'react-bootstrap';

const ProductsPage = () => {
  return (
    <div>
      <Col className="mb-4">
          <img
            style={{height:'20%'}}
            src="https://thefashionbabyandco.com/cdn/shop/files/Peach_Jewelry_and_Accessories_Online_Store_Website_16_d329535c-c2ee-4eef-b206-3b4d843b5a2b_x800.png?v=1688177249"
            alt="Resim"
            className="img-fluid"
          />
      </Col>
      <Products />
    </div>
  );
};

export default ProductsPage;
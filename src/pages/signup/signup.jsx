import React from 'react';
import SignupForm from '../../components/signup/signup';
import { Col, Row } from 'react-bootstrap';
import babystore from '../../resimler/babystore.jpg'

const SignupPage = () => {
  return (
    <div className="container">
      <Row className="row justify-content-center align-items-center my-5">
        <Col xs={12} md={4} lg={6}>
          <img 
            src={babystore}
            alt='babystore'
            className="img-fluid" 
          />
        </Col>
        <Col xs={12} md={8} lg={6}>
          <div className="text-center"> 
            <SignupForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignupPage;

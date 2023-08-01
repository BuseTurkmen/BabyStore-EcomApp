import React from 'react';
import LoginForm from '../../components/login/login';

const LoginPage = () => {
  const handleLogin = (values) => {
    console.log(values);
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center my-5">
        <div className="col-md-6 text-center">
          <LoginForm onSubmit={handleLogin} />
        </div>
        <div className="col-md-6">
          <img 
          src='https://img.freepik.com/free-vector/baby-clothes-set_74855-202.jpg?size=626&ext=jpg&ga=GA1.1.2115967412.1690535170&semt=ais'
          alt=''
          className='img-fluid'
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


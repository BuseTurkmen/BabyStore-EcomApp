// import React from 'react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from '../pages/home/home';
// import Login from '../pages/login/login';
// import Signup from '../pages/signup/signup';
// import Products from '../pages/products/products';
// import DetailPage from '../pages/productsdetail/productdetail';
// import Cart from '../pages/cart/cart';

// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/details/:productId" element={<DetailPage />} />
//         <Route path="/cart" element={<Cart />}  />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Products from '../pages/products/products';
import ProductDetail from '../pages/productsdetail/productdetail';
import Cart from '../pages/cart/cart';
import Favori from '../pages/favoritepage/favorite';
import Admin from '../pages/AdminPanel/AdminPanel'

const AppRouter = (products) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} products={products} />
        <Route path="/products/:productId" element={<ProductDetail/>} products={products}  />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favori" element={<Favori />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

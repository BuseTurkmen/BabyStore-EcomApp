import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { FaShoppingBasket, FaTrash} from 'react-icons/fa';
import {Title } from '../../components/products/cardstyled';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'basket'));
      const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), quantity: 1 }));
      setCartItems(newData);
      setIsCartEmpty(newData.length === 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []); 

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]); 
  
  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDelete = async (id) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'basket'));
      const documentToDelete = querySnapshot.docs.find((doc) => doc.data().id === id);
      if (!documentToDelete) {
        return;
      }
      await deleteDoc(documentToDelete.ref);
    } catch (error) {
      console.error('Hata oluştu:', error);
      return;
    }
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const handlePayment = () => {
    if (!isCartEmpty) {
    } else {
      console.log("Sepet boş.");
    }
  };
  
  const handleClearCart = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'basket'));
      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      setCartItems([]);
    } catch (error) {
      console.error('Hata oluştu:', error);
    }
  };
  
  const handleChangeQuantity = (id, newQuantity) => {
    const quantity = isNaN(newQuantity) || newQuantity < 1 ? 1 : parseInt(newQuantity);
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <div className="container my-5">
      <Title className="mb-3"><FaShoppingBasket /> SEPET </Title>
      <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Ürün Resmi</th>
            <th>Ürün Adı</th>
            <th>Birim Fiyat</th>
            <th>Adet</th>
            <th>Toplam Fiyat</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr className="align-middle" key={item.id}>
              <td><img src={item.picture} style={{ width: '50%' }} alt={item.name} /></td>
              <td>{item.name}</td>
              <td>{item.price} TL</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleChangeQuantity(item.id, e.target.value)}
                  onBlur={() => handleChangeQuantity(item.id, item.quantity)} 
                  style={{ width: '50px', textAlign: 'center' }}
                />
              </td>
              <td>{item.price * item.quantity} TL</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Toplam Fiyat</td>
            <td>{totalPrice} TL</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div className='d-flex justify-content-end'>
    <div className="text-center mt-4 mx-3">
        <button className="btn btn-danger" onClick={handleClearCart}>
          Sepeti Temizle
        </button>
    </div>
    <div className="text-center mt-4">
      {isCartEmpty ? (
      <button className="btn btn-success" disabled>
        Ödeme Yap
        </button>
        ) : (
        <Link to="/payment">
          <button className="btn btn-success">
            Ödeme Yap
            </button>
        </Link>
        )}
      </div>
    </div>
  </div>
  );
};

export default Cart;


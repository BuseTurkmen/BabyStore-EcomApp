
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'basket'));
      const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), quantity: 1 }));
      setCartItems(newData);
      console.log('Firestore veritabanında "basket" koleksiyonu:', newData);
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
        console.error('Belge bulunamadı:', id);
        return;
      }
      await deleteDoc(documentToDelete.ref);
      console.log('Belge başarıyla silindi:', id);
    } catch (error) {
      console.error('Hata oluştu:', error);
      return;
    }
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
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
      <h1 className="mb-3">Sepet</h1>
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
            <tr key={item.id}>
              <td><img src={item.picture} style={{ width: '20%' }} alt={item.name} /></td>
              <td>{item.name}</td>
              <td>{item.price} TL</td>
              <td>
                {/* <button className="btn btn-sm btn-secondary" onClick={() => handleDecrement(item.id)}>-</button> */}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleChangeQuantity(item.id, e.target.value)}
                  onBlur={() => handleChangeQuantity(item.id, item.quantity)} 
                  style={{ width: '50px', textAlign: 'center' }}
                />
                {/* <button className="btn btn-sm btn-secondary" onClick={() => handleIncrement(item.id)}>+</button> */}
              </td>
              <td>{item.price * item.quantity} TL</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Sil</button>
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
  );
};

export default Cart;


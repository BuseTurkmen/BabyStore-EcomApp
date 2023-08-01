import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase'; 

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productSnapshot = await db.collection('products').get();
        const productData = productSnapshot.docs.map((doc) => doc.data());
        setProducts(productData);
      } catch (error) {
        console.error('Ürünler getirilirken hata oluştu:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userSnapshot = await db.collection('users').get();
        const userData = userSnapshot.docs.map((doc) => doc.data());
        setUsers(userData);
      } catch (error) {
        console.error('Kullanıcılar getirilirken hata oluştu:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="container">
        <h2>Ürünler</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ürün Adı</th>
              <th>Fiyat</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Kullanıcılar</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;


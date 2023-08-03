import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase';
import { Container, Row, Col, Form, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/slice/productsReducer";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUsers } from "../../redux/slice/userSlice";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import {Button, Title, CardTitle} from '../../components/products/cardstyled';
import { FaTrash} from 'react-icons/fa';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [selectedSection, setSelectedSection] = useState('products');
  // const users = useSelector((state) => state.user.users); 

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

  const [newProduct, setNewProduct] = useState({
    productName: '',
    productPrice: '',
    productCategory: '',
    productDescription: '',
    productPicture: '', 
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { productName, productPrice, productCategory, productDescription, productPicture } = newProduct;

    try {
      await addDoc(collection(db, 'products'), {
        name: productName,
        price: parseFloat(productPrice), 
        category: productCategory,
        description: productDescription,
        picture: productPicture,
      });

      toast.success('Ürün başarıyla eklendi.');
      setNewProduct({ 
        productName: '',
        productPrice: '',
        productCategory: '',
        productDescription: '',
        productPicture: '',
      });
    } catch (error) {
      toast.error('Ürün eklenirken bir hata oluştu: ' + error.message);
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      toast.success('Ürün başarıyla silindi.');
    } catch (error) {
      toast.error('Ürün silinirken bir hata oluştu: ' + error.message);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Container>
      <Row>
        <Col xs={3} md={2} className="">
          <Nav className="flex-column border border-danger rounded-3 p-3 text-center my-5">
          <CardTitle className='border-bottom '>Admin Paneli</CardTitle>
            <Nav.Item>
              <Nav.Link
                active={selectedSection === 'products'}
                onClick={() => setSelectedSection('products')}
                className='border-bottom'
              >
                Ürünler
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={selectedSection === 'addProduct'}
                onClick={() => setSelectedSection('addProduct')}
                className='border-bottom'
              >
                Ürün Ekle
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={selectedSection === 'users'}
                onClick={() => setSelectedSection('users')}
                className='border-bottom'
              >
                Kullanıcılar
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleLogout}>Çıkış Yap</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={9} md={10} className='my-5'>
          {selectedSection === 'products' && (
            <>
              <Title>Ürünler</Title>
              <table className="table">
                <thead>
                  <tr>
                    <th>Ürün Resmi</th>
                    <th>Ürün Adı</th>
                    <th>Ürün Kategorisi</th>
                    <th>Ürün Bilgisi</th>
                    <th>Ürün Fiyatı</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((products) => (
                    <tr key={products.id} className="align-middle">
                      <td style= {{ width: '20%' }}><img src={products.picture} style={{ width: '100%' }}  alt={products.name} /></td>
                      <td>{products.name}</td>
                      <td>{products.category}</td>
                      <td style={{ width: '20%' }}>{products.description}</td>
                      <td>{products.price} TL</td>
                      <td>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(products.id)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {selectedSection === 'addProduct' && (
            <>
              <Title>Ürün Ekle</Title>
              <Form onSubmit={handleAddProduct}>
                <Form.Group controlId="formProductName">
                  <Form.Label className='my-3'>Ürün Adı</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ürün Adı"
                    value={newProduct.productName}
                    onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductPrice">
                  <Form.Label className='my-3'>Fiyat</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Fiyat"
                    value={newProduct.productPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, productPrice: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductCategory">
                  <Form.Label className='my-3'>Kategori</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kategori"
                    value={newProduct.productCategory}
                    onChange={(e) => setNewProduct({ ...newProduct, productCategory: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductDescription">
                  <Form.Label className='my-3'>Ürün Bilgisi</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Ürün Bilgisi"
                    value={newProduct.productDescription}
                    onChange={(e) => setNewProduct({ ...newProduct, productDescription: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductPicture">
                  <Form.Label className='my-3'>Ürün Resmi</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ürün Resmi (URL)"
                    value={newProduct.productPicture}
                    onChange={(e) => setNewProduct({ ...newProduct, productPicture: e.target.value })}
                  />
                </Form.Group>
                <Button className='mt-4' variant="primary" type="submit">
                  Ürün Ekle
                </Button>
              </Form>
            </>
          )}
          {selectedSection === 'users' && (
            <>
              <Title>Kullanıcılar</Title>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Oluşturulma Tarihi</th>
                    <th>Son Giriş Tarihi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.created}</td>
                      <td>{user.lastSignedIn}</td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </>
          )}
        </Col>
      </Row>
    <ToastContainer /> 
    </Container>
  );
};

export default AdminPanel;


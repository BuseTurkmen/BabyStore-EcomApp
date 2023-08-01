import React, {useState} from 'react';
import { useFormik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticatedNavbar from '../Authnav/AuthNav';
import { useNavigate } from 'react-router-dom'; 
import AdminPanelLayout from '../../pages/AdminPanel/AdminPanel'
import {Button, CardTitle} from '../products/cardstyled';

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const { email, password } = values;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          toast.success('Giriş yapıldı');
        })
        .catch((error) => {
          setUser(null);
          toast.error('Giriş yapılamadı: ' + error.message);
        });
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = 'E-posta alanı zorunludur.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Geçerli bir e-posta adresi giriniz.';
      }

      if (!values.password) {
        errors.password = 'Şifre alanı zorunludur.';
      } else if (values.password.length < 6) {
        errors.password = 'Şifre en az 6 karakter olmalıdır.';
      }

      return errors;
    }
  });
  const handleLogout = () => {
    setUser(null);
  };
  const handleAdminLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUser(user);

      if (user.email === 'admin@gmail.com') {
        navigate('/admin');
      } else {
        toast.success('Giriş yapıldı. Hoş geldiniz, ' + user.displayName || '');
      }

    } catch (error) {
      setUser(null);
      toast.error('Giriş yapılamadı: ' + error.message);
    }
  };

  if (user) {
    return (
      <>
        {user.email === 'admin@gmail.com' ? (
          <AdminPanelLayout handleLogout={handleLogout} />
        ) : (
          <AuthenticatedNavbar userName={user.displayName || ''} handleLogout={handleLogout} />
        )}
      </>
    );
  }
  
  return (
    <>
      <form className="border border-secondray rounded-5 p-3" onSubmit={formik.handleSubmit}>
        <CardTitle >GİRİŞ YAP</CardTitle>
        <div>
          <h6 className='mt-3'>
            <label htmlFor="email">E-posta</label>
          </h6>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <h6 className='mt-3'>
            <label htmlFor="password">Şifre</label>
          </h6>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <Button className='mt-4' type="submit">Giriş Yap</Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;

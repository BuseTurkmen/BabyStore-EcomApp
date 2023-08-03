import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, CardText, CardTitle} from '../products/cardstyled';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slice/userSlice';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      const { firstName, lastName, email, password } = values;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Kayıt başarılı');
        dispatch(setUser({ firstName, lastName, email }));
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        toast.error('Kayıt başarısız: ' + error.message);
      }
    },
    validate: (values) => {
      let errors = {};
      if (!values.firstName) {
        errors.firstName = 'Ad alanı zorunludur.';
      }
      if (!values.lastName) {
        errors.lastName = 'Soyad alanı zorunludur.';
      }
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
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Şifre onay alanı zorunludur.';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Şifreler eşleşmiyor.';
      }
      return errors;
    }
  });

  return (
    <>
    <form className="border border-secondray rounded-5 p-3" onSubmit={formik.handleSubmit}>
    <CardTitle >KAYIT OL</CardTitle>
      <div>
      <h6 className='mt-3'>
        <label htmlFor="firstName">Ad</label>
      </h6>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div>
      <h6 className='mt-3'>
        <label htmlFor="lastName">Soyad</label>
      </h6>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div>
      <h6 className='mt-3'>
        <label htmlFor="email">Eposta</label>
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
      <div>
        <h6 className='mt-3'>
          <label htmlFor="confirmPassword">Şifre Onayı</label>
        </h6>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <Button className='my-4' type="submit">Kayıt Ol</Button>
      <div className="text-center">
        <CardText>Zaten Kayıtlıysanız<button className="text-danger w-10 bg-light rounded border-light" onClick={() => navigate('/login')}>Giriş Yapın</button></CardText>
      </div>
    </form>
    <ToastContainer /> 
  </>
  );
};
export default SignupForm;

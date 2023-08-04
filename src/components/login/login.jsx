import React, {useState} from 'react';
import { useFormik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import AdminPanel from '../../pages/AdminPanel/AdminPanel'
import {Button, CardTitle, CardText} from '../products/cardstyled';
import { useDispatch, useSelector } from "react-redux";
// import saveUser from '../../redux/slice/loginSlice'

const LoginForm = () => {
  // const dispatch = useDispatch()
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
          // console.log(user);
          // dispatch(saveUser({name: user.email}))
          toast.success('Giriş yapıldı. Hoş geldiniz.');
          setTimeout(() => navigate('/products'), 2000); 
          if (user.email === 'admin@gmail.com') {
            setTimeout(() => navigate('/admin'), 2000); 
          }
          // console.log(user);
          // dispatch(saveUser({name: user.email}))

        })
        .catch((error) => {
          setUser(null);
          toast.error('Giriş yapılamadı. Kullanıcı kayıtlı değil. Kayıt olduktan sonra tekrar deneyiniz.');
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
        <Button className='my-4' type="submit">Giriş Yap</Button>
        <div className="text-center">
          <CardText>Kayıtlı Değilseniz<button className="text-danger bg-light rounded border-light" onClick={() => navigate('/signup')}>Kayıt Olun</button></CardText>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;

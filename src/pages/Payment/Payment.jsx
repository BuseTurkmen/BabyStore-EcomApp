import { collection, getDocs } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button } from "../../components/products/cardstyled";
import { db, auth } from "../../firebase/firebase";
import { useFormik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const CheckoutPage = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = auth;
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "basket"));
      const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), quantity: 1 }));
      setCartItems(newData);
      console.log('Firestore veritabanında "basket" koleksiyonu:', newData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
 
//   const clearCart = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "basket"));
//       const batch = db.batch();
//       querySnapshot.docs.forEach((doc) => batch.delete(doc.ref));
//       await batch.commit();
//       setCartItems([]); 
//       console.log("Cart cleared.");
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      address: "",
      phone: "",
      cardNumber: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setUser(user);
        setPaymentCompleted(true);
        toast.success("Alışveriş tamamlandı, güle güle kullanın!");
        // await clearCart();
      } catch (error) {
        setUser(null);
        toast.error("Kullanıcı kayıtlı değil. Kayıt olup tekrar deneyiniz.");
      }
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = "E-posta alanı zorunludur.";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Geçerli bir e-posta adresi giriniz.";
      }
      if (!values.password) {
        errors.password = "Şifre alanı zorunludur.";
      } else if (values.password.length < 6) {
        errors.password = "Şifre en az 6 karakter olmalıdır.";
      }
      return errors;
    },
  });

  return (
    <div className="container my-5">
      <h2>ÖDEME</h2>
      <div className="row">
        <div className="col-md-4 border p-4 rounded-5">
          {paymentCompleted ? (
            <p>Alışveriş tamamlandı, güle güle kullanın!</p>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Eposta:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Şifre:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Adres:
                </label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Telefon Numarası:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Kart Numarası:
                </label>
                <input
                  type="tel"
                  id="cardNumber"
                  name="cardNumber"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardNumber}
                  required
                />
              </div>
              <Button type="submit">Tamamla</Button>
            </form>
          )}
        </div>
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Ürün Adı</th>
                  <th>Adet</th>
                  <th>Birim Fiyat</th>
                  <th>Toplam Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} TL</td>
                    <td>{item.price * item.quantity} TL</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Toplam Fiyat</td>
                  <td>{totalPrice} TL</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
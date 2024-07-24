import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import AddProduct from './components/Home page/add product page/AddProduct';
import LandingPage from './components/Home page/landing page/landingPage';
import LoginPage from './components/login page/Loginpage';
import Navbar from './components/navbar/Navbar';
import SignInPage from './components/signIn page/SignIn';
import ProductDetails from './components/Home page/product details page/productDetails';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Successful from './components/Home page/successful page/successful';
import Myproducts from './components/Home page/my products/myproducts';
import VerifyUser from './components/Home page/verify user/VerifyUser';
import MyOrders from './components/Home page/my orders/MyOrders';
import AdminPage from './components/admin page/adminPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const token = Cookies.get('token');
  const navigate = useNavigate(); // Move useNavigate inside the component

  // useEffect(() => {
  //   if (token) {
  //     navigate('/home');
  //   } else {
  //     navigate('/login');
  //   }
  // }, []);

  return (
    <>
      {(location.pathname !== '/login' && location.pathname !== '/sign-up') && <Navbar />}
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/sign-up" element={<LoginPage />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product-detail/:id" element={<ProductDetails />} />
        <Route path="/success" element={<Successful />} />
        <Route path='/my-products' element={<Myproducts />} />
        <Route path='/verify-user' element={<VerifyUser />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/admin-page' element={<AdminPage />}/>
      </Routes>
    </>
  );
}


export default App;

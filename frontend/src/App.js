import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom'
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import CartScreen from './components/screens/CartScreen';
import ProductScreen from './components/screens/ProductScreen';

export default function App() {
  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/signup' element={<SignUpScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}


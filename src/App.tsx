import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './scss/app.scss';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './components/FullPizza';
import MainLayout from './layouts/MainLayout';

export const SearchContext = React.createContext('');

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AddProducts from './pages/AddProduct.jsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inventory from "./pages/inventory.jsx";
import EditProducts from './pages/EditProduct.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/add-product' element={<AddProducts/>} />
        <Route path='/update-by-id/:productId' element={<EditProducts />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

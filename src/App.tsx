import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Summery from './pages/Summary';
import NavBar from './components/NabBar';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summary/:name" element={<Summery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

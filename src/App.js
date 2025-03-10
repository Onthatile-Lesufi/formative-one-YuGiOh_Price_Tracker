import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Comparison from './pages/comparison';
import Timeline from './pages/timeline';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/comparison' element={<Comparison />} />
          <Route path='/timeline' element={<Timeline />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;

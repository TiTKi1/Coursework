import React from 'react';
import './App.css';
import Upload from './components/Upload';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage,AboutPage, FormPage } from './pages';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar/>
          <div className='pages__wrapper'>
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/form" element={<FormPage/>}/>
              <Route path="/about" element={<AboutPage/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

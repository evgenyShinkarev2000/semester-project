import React from 'react';
import './App.scss';
import Archive from './pages/archive/archive';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Archive/>}></Route>
    </Routes>
    
  );
}

export default App;

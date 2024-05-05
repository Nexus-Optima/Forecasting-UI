
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Overview from './Components/Overview';
import { CommodityProvider } from './Context/forecastContext';


function App() {
  return (
    <CommodityProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Overview/>}/>
        </Routes>
      </div>
    </Router>
    </CommodityProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Overview from './Components/Overview';
import Header from './Utils/Header';
import Sidebar from './Utils/Sidebar';
import HistoricalAnalysis from './Components/HistoricalAnalysis';
import NewsInsight from './Components/NewsInsight';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Overview/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
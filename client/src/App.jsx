import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      {/* Other sections will be added in future phases */}
    </div>
  );
}

export default App;
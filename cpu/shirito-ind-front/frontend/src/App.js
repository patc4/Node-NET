import React from 'react';
import logo from './logo.svg';
import './App.css';
import init from "./editor";

function App() {
  return (
    <div className="App">
      <div style={{ textAlign: "left", width: "100vw", height: "70vh" }}>
        <div ref={el => init(el)} />
      </div>
    </div>
  );
}

export default App;

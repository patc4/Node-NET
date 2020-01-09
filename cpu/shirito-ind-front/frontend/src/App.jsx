import React from 'react';
import logo from './logo.svg';
import './App.css';
import init from "./editor";

const App = () => {
  return (
    <div className="App">
      <img src="logo.png" id="logo"/>
      <div style={{ textAlign: "left", width: "100vw", height: "70vh" }}>
        <div ref={el => init(el)} />
      </div>
    </div>
  );
}

export default App;

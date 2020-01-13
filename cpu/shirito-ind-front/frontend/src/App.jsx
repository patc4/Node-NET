import React from 'react';
import logo from './logo.svg';
import './App.css';
import init from "./editor";

const App = () => {
  return (
    <div className="App">
      <img src="logo.png" id="logo"/>
      <div style={{ textAlign: "left", marginLeft: "5vw", width: "90vw", height: "70vh" }}>
        <div ref={el => init(el)} style={{border: "1px solid black", position: "absolute"}}/>
      </div>
    </div>
  );
}

export default App;

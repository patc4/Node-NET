import React from 'react';
import logo from './logo.svg';
import './App.css';
import init from "./editor";
import { Informations } from "./components/Informations";

const App = () => {
  return (
    <div className="App">
      <img src="logo.png" id="logo" />
      <div class="editor">
        <Informations />
        <div className="container">
          <div ref={el => init(el)} className="node-editor" />
        </div>
      </div>
    </div>
  );
}

export default App;

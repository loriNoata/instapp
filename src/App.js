import React from 'react';
import logo from './logo.svg';
import './App.scss'


import Board from  './main/components/board'
import Header from './main/components/header'

function App() {
  return (
    <div className="App">
        <Header />
        <Board /> 
    </div>
  );
}

export default App;

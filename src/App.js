// imports
import './App.css';
import { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

// components
import Signup_Login from './components/Signup_Login'


function App() {
  return (
    <div className="App">
      <h1>Hello from client side</h1>
      <Signup_Login />
    </div>
  );
}

export default App;

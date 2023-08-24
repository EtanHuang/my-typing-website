import React from 'react';
import './App.css';
import Test from './pages/Test';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';


function App() {
  console.log(window.location);
  let component = null;
  switch (window.location.pathname) {
    case "/test":
      component = <Test />
      break
    case "/login":
      component = <LoginPage />
      break
  }
  return (
    <div>
      {component}
      <NavBar/>
    </div>
  );
}

export default App;  


import './App.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import HelloWorld from 'components/HelloWorld';
import Home from 'pages/Home'
function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/HelloWorld">HelloWorld</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />}>
            
          </Route>
          <Route path="/HelloWorld" element={<HelloWorld name="tom"/>}></Route>             
        </Routes>
      </div>
    </Router>
  );
}

export default App;

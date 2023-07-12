import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Sidebar >
          fdfdfs
        </Sidebar>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <Router> */}
       <Routes>
            <Route exact path="/" element={"Home"}>
              {/* Home */}
            </Route>
            <Route exact path="/login" element={"Login"}>
            
            </Route>
            <Route exact path="/books" element={"Books"}>
            
            </Route>
            </Routes>
        {/* </Router> */}
      </header>
    </div>
  );
}

export default App;

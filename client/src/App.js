import logo from './logo.svg';

import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

import { authenticatedRoutes } from './data';

import Sidebar from './components/Sidebar';
import Books from './pages/books';

function App() {
  return (
    <div className="App">
      <header className="App-header">

{/* <Routes>
  {authenticatedRoutes.map((path,index) => {
    
    {console.log(path)}
    <Route path="/home" element={<Sidebar/>} key={index} />
  })}
\
</Routes> */}
        
         



        
        {/* <Router> */}


       <Routes>
       <Route exact path="/" element={<div> <Link to='/home'>Home</Link>  </div>}>
              {/* Home */}
            </Route>
            <Route exact path="/home" element={<div> <Sidebar/> Home </div>}>
              {/* Home */}
            </Route>
            <Route exact path="/login" element={<div> Login </div>}>
            
            </Route>
            <Route exact path="/books" element={<div> <Sidebar/> <Books/> </div>}>
            
            </Route>
          </Routes>
        {/* </Router> */}
      </header>
    </div>
  );
}

export default App;

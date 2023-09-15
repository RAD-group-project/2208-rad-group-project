
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom'


import Sidebar from './components/Sidebar';
import Books from './pages/books';
import Users from './pages/users';
import Authors from './pages/authors';
import Borrowers from "./pages/borrowers";
import Genre from "./pages/genres"
import Dashboard from './pages/dashboard';

import Auth from './pages/auth';
import { useAuth } from "./hooks/useAuth";


function App() {

  const {user} = useAuth()
  console.log(user)
  return (
    
    <div className="App">
      <header className="App-header">
    


       <Routes>
            {user ? <Route exact path="/" element={  <Navigate to="/dashboard" />} />:<Route exact path="/" element={  <Navigate to="/login" />} />}

            
            {user ? <Route exact path="/login" element={  <Navigate to="/" />} />:<Route exact path="/login" element={ <Auth login/>} />}
            {user ? <Route exact path="/register" element={  <Navigate to="/" />} />:<Route exact path="/register" element={ <Auth register/>} />}

            {!user ? <Route exact path="/dashboard" element={  <Navigate to="/login" />} />:<Route exact path="/dashboard" element={ <div> <Sidebar/>  <Dashboard /> </div>} />}
            {!user ? <Route exact path="/books" element={  <Navigate to="/login" />} />:<Route exact path="/books" element={ <div> <Sidebar/> <Books/> </div>} />}
            {!user ? <Route exact path="/authors" element={ <Navigate to="/login" />} />:<Route exact path="/authors" element={ <div> <Sidebar/> <Authors/> </div>} />}
            {!user ? <Route exact path="/borrowers" element={ <Navigate to="/login" />} />:<Route exact path="/borrowers" element={ <div> <Sidebar/> <Borrowers/> </div>} />}
            {!user ? <Route exact path="/users" element={ <Navigate to="/login" />} />:<Route exact path="/users" element={ <div> <Sidebar/> <Users/> </div>} />}
            {!user ? <Route exact path="/genres" element={ <Navigate to="/login" />} />:<Route exact path="/genres" element={ <div> <Sidebar/> <Genre/> </div>} />}

          </Routes>
      </header>
    </div>
  );
}

export default App;


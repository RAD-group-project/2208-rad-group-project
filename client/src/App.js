import logo from './logo.svg';

import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom'

import { authenticatedRoutes } from './data';

import Sidebar from './components/Sidebar';
import Books from './pages/books';
import Users from './pages/users';
import Authors from './pages/authors';
import Borrowers from "./pages/borrowers";
import Genre from "./pages/genres"

import Auth from './pages/auth';
import { useAuth } from "./hooks/useAuth";


function App() {

  const {user} = useAuth()
  console.log(user)
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
       {/* <Route exact path="/" element={<div> <Link to='/dashboard'>Dashboard</Link> <br/><Link to='/login'>Login</Link>  </div>}>
         
            </Route> */}
            {/* <Route exact path="/dashboard" element={<div> <Sidebar/> Home </div>} /> */}
            {user ? <Route exact path="/" element={  <Navigate to="/dashboard" />} />:<Route exact path="/" element={  <Navigate to="/login" />} />}

            
            {user ? <Route exact path="/login" element={  <Navigate to="/" />} />:<Route exact path="/login" element={ <Auth login/>} />}
            {user ? <Route exact path="/register" element={  <Navigate to="/" />} />:<Route exact path="/register" element={ <Auth register/>} />}

            {!user ? <Route exact path="/dashboard" element={  <Navigate to="/login" />} />:<Route exact path="/dashboard" element={ <div> <Sidebar/> Home </div>} />}
            {!user ? <Route exact path="/books" element={  <Navigate to="/login" />} />:<Route exact path="/books" element={ <div> <Sidebar/> <Books/> </div>} />}
            {!user ? <Route exact path="/authors" element={ <Navigate to="/login" />} />:<Route exact path="/authors" element={ <div> <Sidebar/> <Authors/> </div>} />}
            {!user ? <Route exact path="/borrowers" element={ <Navigate to="/login" />} />:<Route exact path="/borrowers" element={ <div> <Sidebar/> <Borrowers/> </div>} />}
            {!user ? <Route exact path="/users" element={ <Navigate to="/login" />} />:<Route exact path="/users" element={ <div> <Sidebar/> <Users/> </div>} />}
            {!user ? <Route exact path="/genres" element={ <Navigate to="/login" />} />:<Route exact path="/genres" element={ <div> <Sidebar/> <Genre/> </div>} />}

            {/* <Route exact path="/login" element={ <Auth login/>} /> */}
            
            {/* <Route exact path="/register" element={<Auth register/>} /> */}

             {/* <Route exact path="/books" element={<div> <Sidebar/> <Books/> </div>}/> */}
            {/* <Route exact path="/users" element={<div> <Sidebar/> <Users/> </div>}/>
            <Route exact path="/authors" element={<div> <Sidebar/> <Authors/> </div>}/>
            <Route exact path="/borrowers" element={<div> <Sidebar/> <Borrowers/> </div>}/>  */}

              
      
          </Routes>
        {/* </Router> */}
      </header>
    </div>
  );
}

export default App;


// import logo from './logo.svg';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { authenticatedRoutes } from './data';
// import Sidebar from './components/Sidebar';
// import Books from './pages/books';
// import Auth from './pages/auth';
// import { useAuth } from './hooks/useAuth';
// import {ProtectedRoute,LoginRoute} from './protected-routes'; // Import the ProtectedRoute component

// function App() {
//   const { user } = useAuth();
//   console.log(user);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Router>
//           <Routes>
//             {/* {authenticatedRoutes.map((route, index) => (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={<div><Sidebar/>{route.component}</div>}
//               />
//             ))} */}

//             <Route exact path="/" element={<div><Link to="/home">Home</Link></div>} />

//             {/* Use ProtectedRoute for login and register */}
//             <ProtectedRoute
//               exact
//               path="/login"
//               auth={user} // Pass user object as auth prop
//               element={<Auth login />}
//             />
//             <ProtectedRoute
//               exact
//               path="/register"
//               auth={user} // Pass user object as auth prop
//               element={<Auth register />}
//             />

//             <Route exact path="/books" element={<div><Sidebar /><Books /></div>} />
//           </Routes>
//         </Router>
//       </header>
//     </div>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './component/Navigation';
import Home from './component/Home';
import AddUser from './component/AddUser';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

function App() {
    const [ user, setUser ] = useState({});
  function handleCredentialResponse (response)   {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }
useEffect(() => {
    /* global google*/ 
   
      google.accounts.id.initialize({
        client_id: "553517650514-9aj1b9f2nvh7c3pa254k8tanumcu3hq3.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
       // also display the One Tap dialog
    
  }, []);


  return (
    <div className="App">
      
      
        <Navigation />
        <div id='buttonDiv'></div>
        {user && 
         <div>
          <img src={user.picture}></img>
          <h6>{user.name}</h6>
         </div>
      }
      <Routes>
         <Route path='/' element={<Home />}></Route>
        <Route path='/addUser' element={<AddUser />}/>
         
      </Routes>
     
    </div>
  );
}

export default App;

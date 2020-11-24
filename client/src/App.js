import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Admin from './Components/Admin';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Register from './Components/Register';
import Todos from './Components/Todos';
import PrivateRoute from './hoc/PrivateRoute';
import UnPrivateRoute from './hoc/UnPrivateRoute';

import List from './Components/List';
import Projectlist from './Components/Projectlist'


function App() {
 
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home}/>
      <UnPrivateRoute path="/login" component={Login}/>
      
      <Route  path="/projectlist" component={Projectlist}/>
      <UnPrivateRoute path="/register" component={Register}/>
      
      <PrivateRoute path='/list' roles={["user","admin"]} component={List}/>
      <PrivateRoute path='/todos' roles={["user","admin"]} component={Todos}/>
      <PrivateRoute path='/admin' roles={["admin"]} component={Admin}/>
      
     
      
    </Router>
   
    
  );
}

export default App;

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";

import Navbar from './components/Navbars/Navbar.js';
import Home from './components/Home/Home.js';
import GetUsers from './components/GetUser/GetUsers.js';
import LogIn from "./components/Login/LogIn.js";
import LogOut from "./components/Logout/LogOut.js";
import ImageUploader from "./components/ImageUploader/ImageUploader.js";
import CreateUser from './components/CreateUser/CreateUser.js';
import AdminNavbar from "./components/Navbars/AdminNavbar.js";
import './components/Login/LogIn.css'
import './components/CreateUser/CreateUser.css'
import './components/Navbars/Navbar.css'
import './components/Navbars/AdminNavbar.css'
import './components/Home/Home.css'
import './components/Logout/LogOut.css'
import './components/UserList/Pagination.css'
import './components/UserList/UserList.css'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const userRole = localStorage.getItem("userRole");

  return (
    <Router>
      <div className="App">
        {!isLoggedIn && (
          <Route path="/log-in">
            <LogIn setIsLoggedIn={setIsLoggedIn} setCreateUser={setCreateUser} />
          </Route>
        )}
        {!createUser && (
          <Route path="/create">
            <CreateUser setCreateUser={true} />
          </Route>
        )}
        {isLoggedIn && (
          <>
            {userRole === "admin" ? (
              <>
                <AdminNavbar />
                <div className="Content">
                  <Switch>
                    <Route path="/create">
                      <CreateUser />
                    </Route>
                    <Route exact path="/logout">
                      <LogOut setIsLoggedIn={setIsLoggedIn} setCreateUser={setCreateUser} />
                    </Route>
                    <Route exact path="/upload-image">
                      <ImageUploader />
                    </Route>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route exact path="/get-users">
                      <GetUsers />
                    </Route>
                  </Switch>
                </div>
              </>
            ) : (
              <>
                <Navbar />
                <div className="Content">
                  <Switch>
                    <Route exact path="/logout">
                      <LogOut setIsLoggedIn={setIsLoggedIn} setCreateUser={setCreateUser} />
                    </Route>
                    <Route exact path="/upload-image">
                      <ImageUploader />
                    </Route>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route exact path="/get-users">
                      <GetUsers />
                    </Route>
                  </Switch>
                </div>
              </>
            )}
          </>
        )}
        {!isLoggedIn && <Redirect to="/log-in" />}
      </div>
    </Router>
  );
}

export default App;

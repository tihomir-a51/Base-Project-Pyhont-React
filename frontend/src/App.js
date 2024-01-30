import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";

import Navbar from './Navbar';
import Home from './Home';
import GetUsers from './GetUsers';
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import ImageUploader from "./ImageUploader";
import CreateUser from './CreateUser';
import AdminNavbar from "./AdminNavbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const userRole = localStorage.getItem("userRole")

  return (
    <Router>
      <div className="App">
        {!isLoggedIn && (
          <>
            <Route path="/log-in">
              <LogIn setIsLoggedIn={setIsLoggedIn} setCreateUser={setCreateUser} />
            </Route>
          </>
        )}
        {createUser && (
          <>
            <Route path="/create">
              <CreateUser createUser={setCreateUser} />
            </Route>
          </>
        )}
        {isLoggedIn && (
          <>
            {userRole === "admin" ? (
              <AdminNavbar />
            ) : (
              <Navbar />
            )}
            <div className="Content">
              <Switch>
                <Route exact path="/logout">
                  <LogOut setIsLoggedIn={setIsLoggedIn} />
                </Route>
                <Route exact path="/upload-image">
                  <ImageUploader />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                {userRole === 'admin' && (
                  <>
                    <Route exact path="/get-users">
                      <GetUsers />
                    </Route>
                  </>
                )}
              </Switch>
            </div>
          </>
        )}
        {!isLoggedIn && <Redirect to="/log-in" />}
      </div>
    </Router>
  );
}

export default App;


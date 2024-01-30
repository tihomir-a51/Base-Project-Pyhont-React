import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";

import Navbar from './components/Navbar';
import Home from './components/Home';
import GetUsers from './components/GetUsers';
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import ImageUploader from "./components/ImageUploader";
import CreateUser from './components/CreateUser';
import AdminNavbar from "./components/AdminNavbar";

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

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";
import Navbar from './Navbar';
import Home from './Home';
import CreateUser from './CreateUser';
import GetUsers from './GetUsers';
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import ImageUploader from "./ImageUploader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        {!isLoggedIn && (
          <Route path="/log-in">
            <LogIn setIsLoggedIn={setIsLoggedIn} />
          </Route>
        )}
        {isLoggedIn && (
          <>
            <Navbar />
            <div className="Content">
              <Switch>
                <Route exact path="/logout">
                  <LogOut setIsLoggedIn={setIsLoggedIn} />
                </Route>
                <Route exact path="/upload-image">
                  <ImageUploader />
                </Route>
                <Route exact path="/get-users">
                  <GetUsers />
                </Route>
                <Route exact path="/create">
                  <CreateUser />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
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


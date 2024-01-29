import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Navbar from './Navbar'
import Home from './Home'
import CreateUser from './CreateUser'
import GetUsers from './GetUsers'
import LogIn from "./LogIn"
import LogOut from "./LogOut"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/get-users">
              <GetUsers />
            </Route>
            <Route path="/create">
              <CreateUser />
            </Route>
            <Route path="/log-in">
              <LogIn />
            </Route>
            <Route path="/logout">
              <LogOut />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;

import React from "react"
import { Route, Switch } from "react-router-dom"
import Login from "./Login";
import Logout from "./Logout";
import About from "./About";
import TopMenu from "./TopMenu";
import Register from "./Register";
import Places from "./Places";
import Details from "./Details";
import PlaceRegister from "./PlaceRegister";
import UserList from "./UserList";


function App() {
  return (
    <div>
      <TopMenu />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
        <Route path="/places" component={Places} />
        <Route path="/details/:id" component={Details} />
        <Route path="/placeregister" component={PlaceRegister} />
        <Route path="/userlist" component={UserList} />
      </Switch>
    </div>
  )
}
export default App;

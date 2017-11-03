import React from "react"
import { Route, Switch } from "react-router-dom"
import Login from "./Login";
import Logout from "./Logout";
import About from "./About";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import TopMenu from "./TopMenu";
import Register from "./Register";
import Places from "./Places";
import Details from "./Details";
import PlaceRegister from "./PlaceRegister";


function App() {
  return (
    <div>
      <TopMenu />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/about" component={About} />
        <Route path="/user" component={UserPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/register" component={Register} />
        <Route path="/places" component={Places} />
        <Route path="/details/:id" component={Details} />
        <Route path="/placeregister" component={PlaceRegister} />
      </Switch>
    </div>
  )
}
export default App;

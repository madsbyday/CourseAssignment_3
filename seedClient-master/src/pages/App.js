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
<<<<<<< HEAD
import PlaceRegister from "./PlaceRegister";
=======
import UserList from "./UserList";
>>>>>>> ad13112001466cf0e36e3283abaa12d1d2ba421c


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
<<<<<<< HEAD
        <Route path="/placeregister" component={PlaceRegister} />
=======
        <Route path="/userlist" component={UserList} />
>>>>>>> ad13112001466cf0e36e3283abaa12d1d2ba421c
      </Switch>
    </div>
  )
}
export default App;

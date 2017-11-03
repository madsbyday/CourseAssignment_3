import React, { Component } from "react";
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import fetchHelper from "../facades/fetchHelpers"
export default class InterestingPlaces extends Component {
  constructor() {
    super();
    this.state = { users: "" }
  }

  componentDidMount() {
    const options = fetchHelper.makeOptions("GET", true)
    fetch('http://localhost:8084/seedMaven/api/admin/all', options)
      .then(results => {
        return results.json();
      }).then(data => {
        let users = data.map((user) => {
          return (
            <li> {user.username} </li>
          )
        });
        this.setState({ users: users });
        console.log("state", this.state.users);
      })

  }

  render() {
    return (

      <div className="div1">
        <h1>Users</h1>
        <div className="users">
          <ul>
            {this.state.users}
          </ul>
        </div>
      </div>
    )
  }
}

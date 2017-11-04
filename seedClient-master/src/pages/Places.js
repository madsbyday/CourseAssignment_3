import React, { Component } from "react";
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import auth from '../authorization/auth'

export default class InterestingPlaces extends Component {
  constructor() {
    super();
    this.state = { places: "" , isuser: auth.isUser}
  }

  componentDidMount() {
    fetch('http://localhost:8084/seedMaven/api/place/all')
      .then(results => {
        return results.json();
      }).then(data => {
        let places = data.map((place) => {
          let url = "details/" + place.id
          return (

            <Link to={url}>
            <div className="place-container" key ={place.name}>
            <h3> {place.name} </h3>
            <img className="place-img" src={place.imgURI} />
            </div>
            </Link>

          )
        })
        this.setState({ places: places });
        console.log("state", this.state.places);
      })

  }

  render() {
    return (

      <div className="places-container">
        <h2>Places</h2>
        <div className="places">
          <Link to="placeregister">
          {this.state.isuser &&
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register a new place!</button>}
          </Link>
          {this.state.places}

        </div>
      </div>
    )
  }
}

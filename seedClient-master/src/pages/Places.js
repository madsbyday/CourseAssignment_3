import React, { Component } from "react";
import { Switch, Route, Link, NavLink } from 'react-router-dom';

export default class InterestingPlaces extends Component {
  constructor() {
    super();
    this.state = { places: "temp" }
  }

  componentDidMount() {
    fetch('http://localhost:8084/seedMaven/api/place/all')
      .then(results => {
        return results.json();
      }).then(data => {
        let places = data.map((place) => {
          let url = "details/" + place.id
          return (
            <div key={place.name}>
              <h1> {place.name} </h1>
              <Link to={url}>
                <img src={place.imgURI} />
              </Link>
            </div>

          )
        })
        this.setState({ places: places });
        console.log("state", this.state.places);
      })

  }

  render() {
    return (

      <div className="div1">
        <h1>Places</h1>
        <div className="places">
          <Link to="placeregister">
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register a new place!</button>
          </Link>
          {this.state.places}

        </div>
      </div>
    )
  }
}
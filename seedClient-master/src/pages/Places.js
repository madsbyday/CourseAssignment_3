import React, { Component } from "react";

export default class InterestingPlaces extends Component {
  constructor() {
    super();
    //this.state = { place: {
    //"id": 1,
    //"name": "The Eiffel Tower",
    //"address": "someplace",
    //"GPS": "somewhere",
    //"description": "its great",
    //"rating": 4,
    //"imgURI": "https://i.imgur.com/jFu5zSE.jpg" } }
    this.state = { places: "temp" }
  }

  componentDidMount() {
    fetch('http://localhost:8084/seedMaven/api/place/all')
    .then(results => {
        return results.json();
      }).then(data => {
        let places = data.map((place) => {
          return (
            <div key ={place.name}>
            <h1> {place.name} </h1>
            <img src={place.imgURI} />
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

          {this.state.places}

        </div>
      </div>


    )
  }
}
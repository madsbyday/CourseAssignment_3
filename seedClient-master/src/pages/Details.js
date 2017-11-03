import React, { Component } from "react";
import { Switch, Route, Link, NavLink } from 'react-router-dom';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { json:  "" };
  }


  componentDidMount() {
    fetch('http://localhost:8084/seedMaven/api/place/single/' + this.props.match.params.id )
      .then(results => {
        return results.json();
      }).then(data => {
        let json = data;
        this.setState({ json: json });
        console.log("state", this.state.json);
      })

  }



  render() {
      return (
    <div>
    <div className="detail-container">
    <h5><span>Name:</span> {this.state.json.name} </h5>
    <h5><span>Address:</span> {this.state.json.address} </h5>
    <h5><span>GPS-Location:</span> {this.state.json.GPS} </h5>
    <h5><span>Description:</span> {this.state.json.description} </h5>
    <h5><span>Rating:</span> {this.state.json.rating}/5 </h5>
    </div>
    <img className="detail-img" src={this.state.json.imgURI} />


    </div>
      )
  }

}
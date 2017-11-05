import React from "react";
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import auth from '../authorization/auth'

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = { json: "" , rating: "", userName: auth.userName };
        this.setRating = this.setRating.bind(this)
    }


    componentDidMount() {
        fetch('https://ca3.cph-an178.dk/backend/seedMaven/api/place/single/' + this.props.match.params.id)
            .then(results => {
                return results.json();
            }).then(data => {
                let json = data;
                this.setState({ json: json });
                console.log("state", this.state.json);
            })

    }

    setRating(event) {
        let rating = (event.target.value);
        //this.setState({rating: rating});
        auth.setPlaceRating(this.state.userName, this.state.json.id, rating);
        console.log("From Details: " + this.state.userName + " " + this.state.json.id + " " + this.state.rating);
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
    
    <form >
    <label>
         1
      <input name="radio" value="1" type="radio" onClick={this.setRating} />
    </label>
    <label>
         2
      <input name="radio" value="2" type="radio" onClick={this.setRating} />
    </label>
    <label>
         3
      <input name="radio" value="3" type="radio" onClick={this.setRating} />
    </label>
    <label>
         4
      <input name="radio" value="4" type="radio" onClick={this.setRating}  />
    </label>
    <label>
         5
      <input name="radio" value="5" type="radio" onClick={this.setRating} />
    </label>

  </form>

    
  </div>)
    }

}
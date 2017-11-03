import React, { Component } from "react";
import { Switch, Route, Link, NavLink } from 'react-router-dom';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { json: "" };
    }


    componentDidMount() {
        fetch('http://localhost:8084/seedMaven/api/place/single/' + this.props.match.params.id)
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
                <h1> {this.state.json.name} </h1>
                <h1> {this.state.json.id} </h1>
                <img src={this.state.json.imgURI} />
                <h1> {this.state.json.address} </h1>
                <h1> {this.state.json.GPS} </h1>
                <h1> {this.state.json.description} </h1>
                <h1> {this.state.json.rating} </h1>


            </div>
        )
    }

}
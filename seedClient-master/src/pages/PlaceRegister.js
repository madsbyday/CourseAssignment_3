import React, { Component } from 'react';
import auth from "../authorization/auth";

class PlaceRegister extends Component {
    constructor() {
        super();
        this.state = { err: "", place: { name: "", address: "", description: "", imguri: "", gps: "" } }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const name = this.state.place.name;
        const address = this.state.place.address;
        const description = this.state.place.description;
        const imguri = this.state.place.imguri;
        const gps = this.state.place.gps;

        auth.placeregister(name, address, description, imguri, gps, (err) => {
            if (err) {
                return this.setState({ err: err.errorMessage });
            }
            this.setState({ err: "" });
            this.props.history.push("/");
        });

    }

    onChange = (e) => {
        const propertyName = e.target.id;
        const value = e.target.value;
        let place = this.state.place;
        place[propertyName] = value;
        this.setState({ place });
    }

    render() {
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h2 className="form-signin-heading">Register a new place!</h2>
                    <label htmlFor="inputName" className="sr-only">Place name</label>
                    <input type="text" value={this.state.place.name} onChange={this.onChange} className="form-control" id="name" placeholder="Place name" required autoFocus />
                    <label htmlFor="inputAddress" className="sr-only">Address</label>
                    <input type="text" value={this.state.place.address} onChange={this.onChange} id="address" className="form-control" placeholder="Address" required />
                    <label htmlFor="inputDescription" className="sr-only">Short Description</label>
                    <input type="text" value={this.state.place.description} onChange={this.onChange} id="description" className="form-control" placeholder="Description" required />
                    <label htmlFor="inputImage" className="sr-only">Image</label>
                    <input type="text" value={this.state.place.imguri} onChange={this.onChange} id="imguri" className="form-control" placeholder="Image Path (WIP)" />
                    <label htmlFor="inputGPS" className="sr-only">GPS Location</label>
                    <input type="text" value={this.state.place.gps} onChange={this.onChange} id="gps" className="form-control" placeholder="GPS Coordinates (WIP)" required />
                    <br />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                    <br />
                </form>
            </div>
        )
    }
}

export default PlaceRegister;

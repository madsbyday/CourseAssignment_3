import React, { Component } from 'react';

class Register extends Component {
    constructor() {
      super();
      this.state = { err: "", user: {username:"", password:""} }
    }

    handleSubmit = (event) => {

    }

    onChange = (e) => {

    }

    render() {
      return (
        <div className="container">
          <form className="form-signin">
            <h2 className="form-signin-heading">Register</h2>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="text" value={this.state.user.username} onChange={this.onChange} className="form-control" id="username" placeholder="User Name" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" value={this.state.user.password} onChange={this.onChange} id="password" className="form-control" placeholder="Password" required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            <br />
          </form>
      </div>
      )
    }
}

export default Register;

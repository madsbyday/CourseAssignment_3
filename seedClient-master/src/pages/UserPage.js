import React, { Component } from 'react'
import userData from "../facades/userFacade";

class UserPage extends Component {

    constructor(){
      super();
      this.state = {data: "", err:""}
    }

    componentWillMount() {
      /*
      This will fetch data each time you navigate to this route
      If only required once, add "logic" to determine when data should be "refetched"
      */
      userData.getData((e,data)=>{
        if(e){
          return this.setState({err:e.err})
        }
        this.setState({err:"",data});
      });
    }
    render() {
      return (
        <div>
          <h2>Interesting Places</h2>
          
          <div className="msgFromServer">
            {this.state.data}  
          </div>
          { this.state.err && ( 
            <div className="alert alert-danger errmsg-left" role="alert"> 
              {this.state.err}
            </div>
          )}
         
        </div>
      )
    }

  }

export default UserPage;
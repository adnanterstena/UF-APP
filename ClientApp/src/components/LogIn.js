import React, { Component } from 'react';
import axios from "axios";

export class LogIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
        UserName: '',
        Password: '',
        Loading: false,
        ShowCredMsg: false
        
    };
  }


  
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async submit (e)  {
    e.preventDefault();  
    this.setState({Loading: true});

    await axios.post(`api/identity/login`, {
        UserName: this.state.UserName,
        Password: this.state.Password,
    })
    .then((response) => {
      if(response.status === 200){
        window.location.reload(); 
      }else{
        this.setState({Loading: false, ShowCredMsg: true});        
      }
    })
    .catch(() => {
      this.setState({Loading: false, ShowCredMsg: true}); 
    }); 
  }


  render() {
    return (
        <div style={{margin: "auto", width: "50%"}}>
        <br />
        <br />
        {
          this.state.ShowCredMsg ? 
          <p className="text-danger ml-4">Check your credentials</p>
          :
          ""
        }
        <br />                  
          <div className="col-md-9" >
              <form onSubmit={e => this.submit(e)} className="form-group">
              <input autoFocus className="form-control form-control-lg" type="text" name="UserName" placeholder="Email or User name" onChange={e => this.change(e)} />
              <br />
              <br />
              <input className="form-control form-control-lg" type="password" name="Password" placeholder="Password" onChange={e => this.change(e)} />
              <br />
              <br />
              {
                this.state.Loading ?
                <button className="btn btn-primary btn-lg disabled float-right" disabled>
                <span className="spinner-border"></span>
                 </button>
                :
                <button className="btn btn-primary btn-lg disabled float-right" type="submit">Log in</button>
              }                     
              </form>
          </div>                          
      </div>
    );
  }
}

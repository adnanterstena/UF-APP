import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

export class Register extends Component {
 
    constructor(props) {
        super(props);
    
        this.state = {
            UserName:'',
            Email: '',
            Password: '',
            ConfirmPassword: '',
            FirstName: '',
            LastName: '',
            Loading: false,
            ShowCredMsg: false,
            ErrorsMsg:[],
            showPassRepeatedMsg: false,
            showSuccessRegistration: false,
            
        };
      }   



    change(e) {
        this.setState({
        [e.target.name]: e.target.value
        });
    }
    changePASS(e) {
        if(this.state.showPassRepeatedMsg === true){            
            this.setState({showPassRepeatedMsg: false})
        }
        this.setState({
            [e.target.name]: e.target.value
        });
    }

  submit(e)  {
    e.preventDefault(); 
    if(this.state.Password === this.state.ConfirmPassword){  
        this.setState({Loading: true});

        axios.post(`api/identity/register`, {
            UserName: this.state.UserName,
            Email: this.state.Email,
            Password: this.state.Password,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,      
        
        })
        .then( (response) => {
            if(response.status === 200){
                this.setState({ UserName:'',
                                Email: '',
                                Password: '',
                                ConfirmPassword: '',
                                FirstName: '',
                                LastName: '',
                                Loading: false,
                                ShowCredMsg: false,
                                ErrorsMsg:[],
                                showPassRepeatedMsg: false,
                                showSuccessRegistration: true})
            }else{
                this.setState({Loading: false, ShowCredMsg: true});        
            }
        })
        .catch( (e) => { 
            this.setState({ErrorsMsg: e.response.data, Loading: false, ShowCredMsg: true});
        }); 
    }else{
        this.setState({showPassRepeatedMsg: true})
    }
    }



  render() {
    return (
      <div>
        <h1 className="card-title font-weight-lighter">Register</h1>
                {
                this.state.ShowCredMsg ? 
                <div>
                     {this.state.ErrorsMsg.map((item) => (                 
                        <p key={this.state.ErrorsMsg.indexOf(item)} className="text-danger">{item.description}</p>
                    ))}
                </div>
                :
                ""
                }
        <div className="col-md-12" >
                <form onSubmit={e => this.submit(e)} className="form-group">                    
                    <div className="form-group row border rounded-lg p-2 col-md-8">
                        <div className="col-md-6">
                            <label className="form-check-label">User Name <b className="text-danger">*</b></label>
                            <input className="form-control" type="text" name="UserName" value={this.state.UserName} onChange={e => this.change(e)} />                       
                        </div>
                        <div className="col-md-6">
                            <label className="form-check-label">Email <b className="text-danger">*</b></label>
                            <input className="form-control" placeholder="name@example.com" type="text" name="Email" value={this.state.Email} onChange={e => this.change(e)} />
                        </div>                 
                    </div>
                    <div className="form-group row border rounded-lg p-2 col-md-8">
                        {this.state.showPassRepeatedMsg? 
                        <p className="text-danger col-md-12">Repeated password is not the same as Password. And Passwords must be at least 8 characters.</p>  
                        :
                        ""}                
                        <div className="col-md-6">
                            <label className="form-check-label">Password <b className="text-danger">*</b></label>
                            <input className="form-control" type="password" name="Password" value={this.state.Password} onChange={e => this.changePASS(e)} />                       
                        </div>
                        <div className="col-md-6">
                            <label className="form-check-label">Confirm Password <b className="text-danger">*</b></label>
                            <input className="form-control" type="password" name="ConfirmPassword" value={this.state.ConfirmPassword} onChange={e => this.changePASS(e)} />
                        </div>
                    </div>
                    <div className="form-group row border rounded-lg p-2 col-md-8">                         
                        <div className="col-md-6">
                            <label className="form-check-label">First Name</label>
                            <input className="form-control" type="text" name="FirstName" value={this.state.FirstName} onChange={e => this.change(e)} />                        
                        </div>                            
                        <div className="col-md-6">
                            <label className="form-check-label">Last Name</label>
                            <input className="form-control" type="text" name="LastName" value={this.state.LastName} onChange={e => this.change(e)} />                      
                        </div>           
                    </div>
                    <div className="row">
                    {
                      this.state.Loading ?
                      <button className="btn btn-primary btn-lg disabled" disabled>
                      <span className="spinner-border"></span>
                       </button>
                      :                
                    <button className="btn btn-primary btn-lg disabled" type="submit">Register</button>     
                    }
                    {this.state.showSuccessRegistration? 
                    <h4 className="text-success ml-5 mt-2">Successfully registered. <span className="text-muted">You can now go <Link to="/" className="btn-link">to login</Link></span></h4>
                    :""}
                    
                    </div>
                </form>
            </div>



      </div>
    );
  }
}

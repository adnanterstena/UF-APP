import React, { Component } from 'react';
import axios from "axios";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  //logout API Method
  logOutCLick(){
    axios.get(`api/identity/logout`, {
    })
    .then((response) => {
        if(response.status === 200){
          window.location.reload();
        }
    })
    .catch(); 
  }


  //Check if this tooken exist
  getCookie( name) {
      var dc,
          prefix,
          begin,
          end;

      dc = document.cookie;
      prefix = name + "=";
      begin = dc.indexOf("; " + prefix);
      end = dc.length; // default to end of the string

      // found, and not in first position
      if (begin !== -1) {
          // exclude the "; "
          begin += 2;
      } else {
          //see if cookie is in first position
          begin = dc.indexOf(prefix);
          // not found at all or found as a portion of another cookie name
          if (begin === -1 || begin !== 0 ) return null;
      } 

      // if we find a ";" somewhere after the prefix position then "end" is that position,
      // otherwise it defaults to the end of the string
      if (dc.indexOf(";", begin) !== -1) {
          end = dc.indexOf(";", begin);
      }
      return decodeURI(dc.substring(begin + prefix.length, end) ).replace(/"/g, ''); 
  }


  render () {
    const identityCh = this.getCookie("idsrv.session");
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            
            <ul className="navbar-nav flex-grow">
            {
            identityCh ?            
            <NavItem>
            <button className="dropdown-item rounded-lg text-muted border mt-1" onClick={e => this.logOutCLick()} >Log Out</button>
            </NavItem>
            
            :
            <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/login">Log In</NavLink>
              </NavItem>
            </ul>            
            }
                
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

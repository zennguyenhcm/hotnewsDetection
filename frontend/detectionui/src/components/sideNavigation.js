import React from 'react';
import {MDBListGroup, MDBListGroupItem, MDBIcon} from 'mdbreact';
import {NavLink} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

const TopNavigation = () => {
  return (
    <div className="sidebar-fixed position-fixed">
      <a href="#!" className="logo-wrapper waves-effect">
        <p>Hello</p>
      </a>
      <Router>
        <MDBListGroup className="list-group-flush">
          <NavLink exact={true} to="/" activeClassName="activeClass">
            <MDBListGroupItem>
              <MDBIcon icon="chart-pie" className="mr-3" />
              Dashboard
            </MDBListGroupItem>
          </NavLink>
        </MDBListGroup>
      </Router>
    </div>
  );
};

export default TopNavigation;

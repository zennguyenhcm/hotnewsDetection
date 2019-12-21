import React from 'react';
import {MDBListGroup, MDBListGroupItem, MDBIcon} from 'mdbreact';
import {NavLink} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

const SideNavigation = () => {
  return (
    <div className="sidebar-fixed position-fixed">
      <a href="#!" className="logo-wrapper waves-effect">
        <p>Hello</p>
      </a>
      <Router>
        <MDBListGroup className="list-group-flush">
          <NavLink exact={true} to="/" activeClassName="activeClass">
            <MDBListGroupItem>
              <MDBIcon icon="table" className="mr-3" />
              Crawler
            </MDBListGroupItem>
          </NavLink>
          <NavLink to="/hotkeyword" activeClassName="activeClass">
            <MDBListGroupItem>
              <MDBIcon icon="fire" className="mr-3" />
              Hot Keywords Viewer
            </MDBListGroupItem>
          </NavLink>
          <NavLink to="/insight" activeClassName="activeClass">
            <MDBListGroupItem>
              <MDBIcon icon="chart-line" className="mr-3" />
              Insights
            </MDBListGroupItem>
          </NavLink>
          <NavLink to="/extractor" activeClassName="activeClass">
            <MDBListGroupItem>
              <MDBIcon icon="eye" className="mr-3" />
              Keywords Extractor
            </MDBListGroupItem>
          </NavLink>
        </MDBListGroup>
      </Router>
    </div>
  );
};

export default SideNavigation;

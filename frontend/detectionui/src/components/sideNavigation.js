import React from 'react';
import {MDBListGroup, MDBListGroupItem, MDBIcon} from 'mdbreact';
import {NavLink} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

const refreshPage = () => {
  window.location.reload ();
};
const SideNavigation = () => {
  return (
    <div className="sidebar-fixed position-fixed">
      <a href="#!" className="logo-wrapper waves-effect">
        <p>Hello</p>
      </a>
      <Router>
        <MDBListGroup className="list-group-flush">
          <button onClick={refreshPage}>
            <NavLink exact={true} to="/">
              <MDBListGroupItem>
                <MDBIcon icon="home" className="mr-3" />
                FirstPage
              </MDBListGroupItem>
            </NavLink>
          </button>

          <button onClick={refreshPage}>
            <NavLink to="/crawler" refresh="true">
              <MDBListGroupItem>
                <MDBIcon icon="table" className="mr-3" />
                Crawler
              </MDBListGroupItem>
            </NavLink>
          </button>

          <button onClick={refreshPage}>
            <NavLink to="/hotkeyword">
              <MDBListGroupItem>
                <MDBIcon icon="fire" className="mr-3" />
                Hot Keywords Viewer
              </MDBListGroupItem>
            </NavLink>
          </button>

          <button onClick={refreshPage}>
            <NavLink to="/insight">
              <MDBListGroupItem>
                <MDBIcon icon="chart-line" className="mr-3" />
                Insights
              </MDBListGroupItem>
            </NavLink>
          </button>

          <button onClick={refreshPage}>
            <NavLink to="/extractor">
              <MDBListGroupItem>
                <MDBIcon icon="eye" className="mr-3" />
                Keywords Extractor
              </MDBListGroupItem>
            </NavLink>
          </button>

        </MDBListGroup>
      </Router>
    </div>
  );
};

export default SideNavigation;

import React from 'react';
import {MDBListGroup, MDBListGroupItem, MDBIcon, MDBBtn} from 'mdbreact';
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
          <MDBBtn onClick={refreshPage}>
            <NavLink exact={true} to="/">
              <div>
                <MDBIcon icon="home" className="mr-3" />
                FirstPage
              </div>

            </NavLink>
          </MDBBtn>

          <MDBBtn onClick={refreshPage}>

            <NavLink to="/crawler" refresh="true">
              <div>
                <MDBIcon icon="table" className="mr-3" />
                Crawler
              </div>
            </NavLink>
          </MDBBtn>

          <MDBBtn onClick={refreshPage}>
            <NavLink to="/hotkeyword">

              <div>
                <MDBIcon icon="fire" className="mr-3" />
                Hot Keywords Viewer
              </div>
            </NavLink>
          </MDBBtn>

          <MDBBtn onClick={refreshPage}>
            <NavLink to="/insight">
              <div>
                <MDBIcon icon="chart-line" className="mr-3" />
                Insights
              </div>

            </NavLink>
          </MDBBtn>

          <MDBBtn onClick={refreshPage}>
            <NavLink to="/extractor">
              <div>
                <MDBIcon icon="eye" className="mr-3" />
                Keywords Extractor
              </div>

            </NavLink>
          </MDBBtn>

        </MDBListGroup>
      </Router>
    </div>
  );
};

export default SideNavigation;

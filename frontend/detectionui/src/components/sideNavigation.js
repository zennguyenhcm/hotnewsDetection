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
      <a href="#!" className="logo-wrapper waves-effect" />
      <Router>
        <MDBListGroup className="list-group-flush">
          <MDBBtn onClick={refreshPage}>
            <NavLink exact={true} to="/">
              <div>
                <MDBIcon icon="home" className="mr-3" />
                Home
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
            <NavLink to="/keywordOverview">
              <div>
                <MDBIcon icon="fire" className="mr-3" />
                TFIDF
              </div>
            </NavLink>
          </MDBBtn>

          <MDBBtn onClick={refreshPage}>
            <NavLink to="/tatfidfCompute">
              <div>
                <MDBIcon icon="chart-line" className="mr-3" />
                TA TFIDF{' '}
              </div>

            </NavLink>
          </MDBBtn>

          <MDBBtn onClick={refreshPage}>
            <NavLink to="/wordCloud">
              <div>
                <MDBIcon icon="cloud" className="mr-3" />
                Words Cloud
              </div>

            </NavLink>
          </MDBBtn>

        </MDBListGroup>
      </Router>
    </div>
  );
};

export default SideNavigation;

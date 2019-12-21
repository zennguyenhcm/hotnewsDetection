import React, {Component} from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBRow,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBIcon,
} from 'mdbreact';
import HotKeywordPage from '../HotKeywordPage';

class HotKeywordTable extends Component {
  render () {
    return (
      <MDBRow className="mb-4">
        <MDBCol md="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Pie chart</MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup className="list-group-flush">
                <MDBListGroupItem>
                  Sales
                  <MDBBadge color="success-color" pill className="float-right">
                    22%
                    <MDBIcon icon="arrow-up" className="ml-1" />
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Traffic
                  <MDBBadge color="danger-color" pill className="float-right">
                    5%
                    <MDBIcon icon="arrow-down" className="ml-1" />
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Orders
                  <MDBBadge color="primary-color" pill className="float-right">
                    14
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Issues
                  <MDBBadge
                    color="primary-color"
                    pill
                    className="float-right"
                  />
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Messages
                  <MDBBadge color="primary-color" pill className="float-right">
                    8
                  </MDBBadge>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default HotKeywordTable;

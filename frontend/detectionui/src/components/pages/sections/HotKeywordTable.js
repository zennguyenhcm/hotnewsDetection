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

import KeywordCell from '../sections/KeywordCell';

export default function HotKeywordTable({catName, kwData}) {
  const size = kwData.lenght > 2 ? 2 : kwData.lenght;
  const data = kwData.slice (0, size).map (item => (
    <tr>
      <KeywordCell
        content={Object.keys (item)}
        news={Object.values (item)}
        style={{width: '100%'}}
      />
    </tr>
  ));
  return (
    <MDBCard>
      <MDBCardHeader><strong>{catName}</strong></MDBCardHeader>
      <MDBCardBody>
        {data}
        {/* <Cell content="hello" /> */}
      </MDBCardBody>
    </MDBCard>
  );
  // <MDBRow className="mb-4">
  //   <MDBCol md="4" className="mb-4">
  //     <MDBCard className="mb-4">
  //       <MDBCardHeader>{cat}</MDBCardHeader>
  //       <MDBCardBody>
  //         <MDBListGroup className="list-group-flush">
  //           <MDBListGroupItem>
  //             Sales
  //             <MDBBadge color="success-color" pill className="float-right">
  //               22%
  //               <MDBIcon icon="arrow-up" className="ml-1" />
  //             </MDBBadge>
  //           </MDBListGroupItem>
  //           <MDBListGroupItem>
  //             Traffic
  //             <MDBBadge color="danger-color" pill className="float-right">
  //               5%
  //               <MDBIcon icon="arrow-down" className="ml-1" />
  //             </MDBBadge>
  //           </MDBListGroupItem>
  //           <MDBListGroupItem>
  //             Orders
  //             <MDBBadge color="primary-color" pill className="float-right">
  //               14
  //             </MDBBadge>
  //           </MDBListGroupItem>
  //           <MDBListGroupItem>
  //             Issues
  //             <MDBBadge color="primary-color" pill className="float-right" />
  //           </MDBListGroupItem>
  //           <MDBListGroupItem>
  //             Messages
  //             <MDBBadge color="primary-color" pill className="float-right">
  //               8
  //             </MDBBadge>
  //           </MDBListGroupItem>
  //         </MDBListGroup>
  //       </MDBCardBody>
  //     </MDBCard>
  //   </MDBCol>
  // </MDBRow>
}

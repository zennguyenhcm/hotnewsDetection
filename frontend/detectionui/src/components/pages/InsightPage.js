import React from 'react';
import TatfidfButton from './sections/TatfidfButton';
import {MDBCard, MDBCardBody} from 'mdbreact';
import NewsViewer from './sections/NewsViewer';

class InsightPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [],
    };
  }

  getDataFromChild = data => {
    console.log ('getdata', data);
    this.setState (
      {
        data: data,
      },
      data => {
        // console.log ('callback');
        // return (
        //   <MDBCard>
        //     <MDBCardBody>
        //       {this.renderListArticles (this.state.data)}
        //     </MDBCardBody>
        //   </MDBCard>
        // );
      }
    );
  };

  // renderListArticles = data => {
  //   console.log ('renderArticle', Object.values (data));
  //   console.log ('type', typeof data);

  //   Object.values (data).map (item => {
  //     console.log ('item', item);
  //     console.log ('type of item', typeof item);
  //     console.log ('value', item[0]);
  //     return (
  //       <div>
  //         <p>Hello{console.log ('hello')}</p>
  //         <p>{item[0]}</p>
  //         <p>{item[1]}</p>
  //         <p>{item[2]}</p>
  //       </div>
  //     );
  //   });
  // };
  render () {
    return (
      <React.Fragment>
        <TatfidfButton parentCallback={this.getDataFromChild} />
        <NewsViewer data={this.state.data} />
      </React.Fragment>
    );
  }
}

export default InsightPage;

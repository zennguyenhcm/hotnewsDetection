import React from 'react';
import TatfidfButton from './sections/TatfidfButton';
import TfidfButton from './sections/TfidfButton';
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardFooter} from 'mdbreact';
import NewsViewer from './sections/NewsViewer';

class InsightPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      ta_data: [],
      tf_data: [],
    };
  }

  ta_getDataFromChild = data => {
    console.log ('getdata', data);
    console.log ('type_of_data', typeof data);
    this.setState (
      {
        ta_data: data,
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

  tf_getDataFromChild = data => {
    // console.log ('getdata', data);
    this.setState (
      {
        tf_data: data,
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
        <div className="row">
          <div className="col-6">
            <MDBCard>
              <MDBCardHeader>TA TF-IDF</MDBCardHeader>
            </MDBCard>
            <MDBCardBody>
              <NewsViewer data={this.state.ta_data} algo_name="tatfidf" />
            </MDBCardBody>
            <MDBCardFooter>
              <TatfidfButton parentCallback={this.ta_getDataFromChild} />
            </MDBCardFooter>
          </div>
          <div className="col-6">
            <MDBCard>
              <MDBCardHeader>TF-IDF</MDBCardHeader>
            </MDBCard>
            <MDBCardBody>
              <NewsViewer data={this.state.tf_data} algo_name="tfidf" />
            </MDBCardBody>
            <MDBCardFooter>
              <TfidfButton parentCallback={this.tf_getDataFromChild} />
            </MDBCardFooter>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default InsightPage;

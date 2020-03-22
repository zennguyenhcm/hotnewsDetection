import React from 'react';
import {MDBCardHeader, MDBCard, MDBCardBody} from 'mdbreact';
import SimpleCloud from './SimpleCloud';

class WordCloud extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: this.props.data,
      metric: '',
    };
    // this.onChangeMetric = this.onChangeMetric.bind (this);
  }
  //   state = {
  //     data: this.props.data,
  //     metric: this.props.metric,
  //   };
  //   onChangeMetric = (data, metric) => {
  //     console.log ('onchangeMetric: ', data, metric);
  //     this.setState ({
  //       data: this.state.data,
  //       metric: this.state.metric,
  //     });
  //   };

  componentDidUpdate (prevProps, prevState) {
    // Don't forget to compare states
    if (
      prevProps.metric !== this.props.metric ||
      prevProps.data != this.props.data
    ) {
      this.setState ({
        data: this.props.data,
        metric: this.props.metric,
      });
    }
  }
  render () {
    // const renderData = () => {
    //   this.setState ({
    //     dataBar: this.setDataBar (labels, data),
    //   });
    //   return this.dataBar;
    // };

    // console.log ('labels: ', data);
    // console.log ('labels: ', metric);
    return (
      <MDBCard>
        <MDBCardHeader>
          WordCloud
        </MDBCardHeader>
        <MDBCardBody className="black">
          <SimpleCloud data={this.state.data} metric={this.state.metric} />
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default WordCloud;

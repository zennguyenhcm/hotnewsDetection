import React from 'react';
import WordCloudGenerateButton from './sections/WordCloudGenerateButton';
import {MDBCard, MDBCardBody} from 'mdbreact';
import SimpleCloud from './sections/SimpleCloud';

class ExtractorPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [],
    };
  }

  getDataFromChild = data => {
    console.log ('getdata', data);
    this.setState ({
      data: data,
    });
  };

  getKeywordArray = data => {
    let keywordArr = [];
    for (let key in data) {
      keywordArr.push (...data[key].slice (0, 5));
    }
    let unique = [...new Set (Object.values (keywordArr))];
    console.log ('unique', unique);
    return keywordArr;
  };

  render () {
    return (
      <React.Fragment>
        <WordCloudGenerateButton parentCallback={this.getDataFromChild} />
        <MDBCard>
          <MDBCardBody>
            {console.log (this.getKeywordArray (this.state.data))}
            <SimpleCloud data={this.getKeywordArray (this.state.data)} />
          </MDBCardBody>
        </MDBCard>

      </React.Fragment>
    );
  }
}

export default ExtractorPage;

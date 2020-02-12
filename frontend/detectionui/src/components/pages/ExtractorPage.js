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

  removeDuplicateKeyword = arr => {
    var temp = [];
    var uniqueArr = [];
    for (let index = 0; index < arr.length; index++) {
      var keyword = Object.keys (arr[index])[0];
      // console.log ('keyword', keyword);
      //check whether keyword
      if (!temp.includes (keyword)) {
        temp.push (keyword);
        uniqueArr.push (arr[index]);
      } else {
        continue;
      }
    }
    // console.log ('temp', temp);
    return uniqueArr;
  };

  getKeywordArray = data => {
    let keywordArr = [];
    for (let key in data) {
      keywordArr.push (...data[key].slice (0, 15));
    }
    console.log ('keywordArr', keywordArr);
    keywordArr = this.removeDuplicateKeyword (keywordArr);
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

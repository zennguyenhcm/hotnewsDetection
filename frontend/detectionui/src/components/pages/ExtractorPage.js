import React from 'react';
import WordCloudGenerateButton from './sections/WordCloudGenerateButton';
import {MDBInput, MDBFormInline} from 'mdbreact';
import WordCloud from './sections/WordCloud';
import ChartPage from './sections/BarChart';
class ExtractorPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [],
      metric: 'tfidf_attention',
      radio: 1,
    };
  }

  onClick = (nr, metric) => () => {
    this.setState ({
      radio: nr,
      metric: metric,
    });
  };
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

        <div className="row d-flex justify-content-between">
          <WordCloudGenerateButton parentCallback={this.getDataFromChild} />
          <MDBFormInline>
            <MDBInput
              onClick={this.onClick (1, 'tfidf_attention')}
              checked={this.state.radio === 1 ? true : false}
              label="Mặc định"
              type="radio"
              id="radio1"
              containerClass="mr-3"
            />
            <MDBInput
              onClick={this.onClick (2, 'attention')}
              checked={this.state.radio === 2 ? true : false}
              label="Lượt quan tâm"
              type="radio"
              id="radio2"
              containerClass="mr-3"
            />
            <MDBInput
              onClick={this.onClick (3, 'popular')}
              checked={this.state.radio === 3 ? true : false}
              label="Số lượng bài báo"
              type="radio"
              id="radio3"
              containerClass="mr-3"
            />
            <MDBInput
              onClick={this.onClick (4, 'tfidf')}
              checked={this.state.radio === 4 ? true : false}
              label="Giá trị TFIDF"
              type="radio"
              id="radio3"
              containerClass="mr-3"
            />
          </MDBFormInline>
        </div>

        {/* <MDBCard>
          <MDBCardHeader>
            WordCloud
          </MDBCardHeader>
          <MDBCardBody>
            {console.log (this.getKeywordArray (this.state.data))}
            <SimpleCloud
              data={this.getKeywordArray (this.state.data)}
              metric={this.state.metric}
            />
          </MDBCardBody>
        </MDBCard> */}
        <WordCloud
          data={this.getKeywordArray (this.state.data)}
          metric={this.state.metric}
        />
        <ChartPage
          data={this.getKeywordArray (this.state.data)}
          metric={this.state.metric}
        />
      </React.Fragment>
    );
  }
}

export default ExtractorPage;

import React from 'react';
import {TagCloud} from 'react-tagcloud';

const colorDict = {
  '1': 'red',
  '2': 'green',
  '3': 'blue',
  '4': 'white',
  '5': 'black',
  '6': 'yellow',
  '7': 'purple',
  '8': 'pink',
};
const normalizeNumber = {
  a: 0.5,
  b: 0.3,
  c: 0.2,
};

export default class SimpleCloud extends React.Component {
  getColorByIndex = index => {
    if (index <= 4) {
      return 'red';
    } else if (index <= 9) {
      return 'green';
    } else if (index <= 14) {
      return 'blue';
    } else if (index <= 19) {
      return 'yellow';
    } else if (index <= 24) {
      return 'black';
    } else if (index <= 29) {
      return 'purple';
    } else if (index <= 34) {
      return 'pink';
    } else return 'grey';
  };

  getRenderValue = keywordData => {
    let renderValueArr = [];
    for (const [index, element] of Object.entries (keywordData)) {
      var newObj = {};
      console.log ('element', element);
      let key = Object.keys (element)[0];
      newObj['value'] = key;
      newObj['color'] = this.getColorByIndex (index);
      newObj['size'] = this.getWordWeightingValue (element[key]);
      renderValueArr.push (newObj);
    }
    console.log ('renderData', renderValueArr);
    return renderValueArr;
  };
  getWordWeightingValue = wordObj => {
    let result =
      normalizeNumber['a'] * wordObj['average_like_rate'] +
      normalizeNumber['b'] * wordObj['number_of_articles'] +
      normalizeNumber['c'] * wordObj['max_tfidf'];
    return result;
  };
  getTagDataArray = keywordData => {
    let resultArray = [];
    for (const [key, value] of Object.entries (keywordData)) {
      var new_tag = {};
      var tag = Object.keys (value)[0];
      new_tag['value'] = tag;
      new_tag['count'] = this.getWordWeightingValue (value[tag]);
      resultArray.push (new_tag);
    }
    console.log ('resultArray', resultArray);
    return resultArray;
  };

  customRenderer = renderData => {
    console.log ('customRenderer', renderData);
    renderData.map (item => {
      return (
        <span
          key={item['value']}
          style={item['color']}
          className={'tag-'.concat (item['size'].toString ())}
        >
          {item['value']}
        </span>
      );
    });
  };

  render () {
    const {data} = this.props;
    console.log ('simpled_cloud_data', data);
    return (
      <TagCloud
        minSize={18}
        maxSize={42}
        tags={this.getTagDataArray (data)}
        // onClick={tag => alert (`'${tag.value}' was selected!`)}
        renderer={this.customRenderer (this.getRenderValue (data))}
      />
    );
  }
}

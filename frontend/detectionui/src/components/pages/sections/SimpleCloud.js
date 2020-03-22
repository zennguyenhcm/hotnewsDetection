import React from 'react';
import {TagCloud} from 'react-tagcloud';

const normalizeNumber = {
  equal: {
    a: 0.5,
    b: 0.3,
    c: 0.2,
  },
  attention: {
    a: 0.001,
    b: 0,
    c: 0,
  },
  popular: {
    a: 0,
    b: 0.1,
    c: 0,
  },
  tfidf: {
    a: 0,
    b: 0,
    c: 1,
  },
  tfidf_attention: {
    a: 0.025,
    b: 0.3,
    c: 0.675,
  },
};

export default class SimpleCloud extends React.Component {
  // writeRenderDataToJsonFile =()=>{

  // }

  // state = {
  //   data: this.props.data,
  //   metric: this.props.metric,
  // };
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

  getRenderValue = (keywordData, metric) => {
    let renderValueArr = [];
    for (const [index, element] of Object.entries (keywordData)) {
      var newObj = {};
      console.log ('element', element);
      let key = Object.keys (element)[0];
      newObj['value'] = key;
      newObj['color'] = this.getColorByIndex (index);
      newObj['size'] = this.getWordWeightingValue (element[key], metric);
      renderValueArr.push (newObj);
    }
    console.log ('renderData', renderValueArr);
    return renderValueArr;
  };
  getWordWeightingValue = (wordObj, metric) => {
    console.log ('normalizeNumber', normalizeNumber[metric]);
    let result =
      normalizeNumber[metric]['a'] * wordObj['average_like_rate'] +
      normalizeNumber[metric]['b'] * wordObj['number_of_articles'] +
      normalizeNumber[metric]['c'] * wordObj['max_tfidf'];
    return result;
  };
  getTagDataArray = (keywordData, metric) => {
    let resultArray = [];
    for (const [key, value] of Object.entries (keywordData)) {
      var new_tag = {};
      var tag = Object.keys (value)[0];
      new_tag['value'] = tag;
      new_tag['count'] = this.getWordWeightingValue (value[tag], metric);
      resultArray.push (new_tag);
    }
    console.log ('resultArray', resultArray);
    return resultArray;
  };

  // async bindingData (data, metric){
  //   const barChartData = await this.getTagDataArray(data, metric)
  //   this.props.parentCallback(barChartData)
  // }

  customRenderer = renderData => {
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

  // onChangeMetric = (data, metric) => {
  //   console.log ('onchangeMetric: ', data, metric);
  //   this.setState ({
  //     data: this.customRenderer (
  //       this.getRenderValue (this.state.data, this.state.metric)
  //     ),
  //     metric: this.customRenderer (
  //       this.getRenderValue (this.state.data, this.state.metric)
  //     ),
  //   });
  // };

  render () {
    const {data, metric} = this.props;
    // console.log ('simpled_cloud_data', data);
    // console.log ('metric_start_render', metric);
    // see randomColor package: https://github.com/davidmerfield/randomColor
    const options = {
      luminosity: 'light',
      hue: 'blue',
    };
    return (
      <TagCloud
        minSize={18}
        maxSize={50}
        tags={this.getTagDataArray (data, metric)}
        // onClick={tag => alert (`'${tag.value}' was selected!`)}
        renderer={this.customRenderer (this.getRenderValue (data, metric))}
        shuffle={true}
        disableRandomColor={false}
        colorOptions={options}
      />
    );
  }
}

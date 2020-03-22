import React from 'react';
import {Bar} from 'react-chartjs-2';
import {MDBContainer} from 'mdbreact';
import {defaults} from 'react-chartjs-2';
defaults.global.defaultFontSize = 18;

const normalizeNumber = {
  equal: {
    a: 0.5,
    b: 0.3,
    c: 0.2,
  },
  attention: {
    a: 1,
    b: 0,
    c: 0,
  },
  popular: {
    a: 0,
    b: 1,
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

class ChartsPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.25)',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.25)',
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      dataBar: {},
    };
  }

  getRenderValue = (keywordData, metric) => {
    let renderValue = {};
    for (const [index, element] of Object.entries (keywordData)) {
      console.log ('element', element);
      let key = Object.keys (element)[0];
      renderValue[key] = this.getWordWeightingValue (element[key], metric);
    }
    console.log ('renderDataNew', renderValue);
    return renderValue;
  };
  getWordWeightingValue = (wordObj, metric) => {
    console.log ('normalizeNumber', normalizeNumber[metric]);
    let result =
      normalizeNumber[metric]['a'] * wordObj['average_like_rate'] +
      normalizeNumber[metric]['b'] * wordObj['number_of_articles'] +
      normalizeNumber[metric]['c'] * wordObj['max_tfidf'];
    return result;
  };
  //   getTagDataArray = (keywordData, metric) => {
  //     let resultArray = [];
  //     for (const [key, value] of Object.entries (keywordData)) {
  //       var new_tag = {};
  //       var tag = Object.keys (value)[0];
  //       new_tag['value'] = tag;
  //       new_tag['count'] = this.getWordWeightingValue (value[tag], metric);
  //       resultArray.push (new_tag);
  //     }
  //     console.log ('resultArray', resultArray);
  //     return resultArray;
  //   };

  //   customRenderer = renderData => {
  //     renderData.map (item => {
  //       return (
  //         <span
  //           key={item['value']}
  //           style={item['color']}
  //           className={'tag-'.concat (item['size'].toString ())}
  //         >
  //           {item['value']}
  //         </span>
  //       );
  //     });
  //   };
  rankDict = dict => {
    var sortable = [];

    for (var item in dict) {
      sortable.push ([item, dict[item]]);
    }

    sortable.sort (function (a, b) {
      return b[1] - a[1];
    });
    var objSorted = {};
    sortable.slice (0, 25).forEach (function (item) {
      objSorted[item[0]] = item[1];
    });
    console.log (objSorted);

    return objSorted;
  };

  convertData = (renderData, metric) => {
    console.log ('ranking: ', renderData);
    let rankedList = this.rankDict (renderData);
    // renderData.map (item => {
    //   listLabels.push (Object.keys (item));
    //   listValues.push (Object.values (item));
    // });
    return this.setDataBar (
      Object.keys (rankedList),
      Object.values (rankedList),
      metric
    );
  };

  setLable = metric => {
    switch (metric) {
      case 'attention':
        return 'Độ quan tâm';
        break;
      case 'tfidf':
        return 'TF IDF';
        break;
      case 'popular':
        return 'Số bài báo';
        break;
      default:
        return 'Độ nóng';
    }
  };
  setDataBar = (labels, data, metric) => {
    let dataBar = {
      labels: labels,
      datasets: [
        {
          label: this.setLable (metric),
          data: data,
          backgroundColor: [
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(255, 134,159,0.5)',
            'rgba(98,  182, 239,0.5)',
            'rgba(98,  182, 239,0.5)',
            'rgba(98,  182, 239,0.5)',
            'rgba(98,  182, 239,0.5)',
            'rgba(98,  182, 239,0.5)',
            'rgba(98,  182, 239,0.5)',
            'rgba(98,  182, 239,0.5)',
            'rgba(98,  182, 239,0.5)',
            'rgba(98,  182, 239,0.5)',
            'rgba(98,  182, 239,0.5)',
          ],
          borderWidth: 2,
          borderColor: [
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(255, 134, 159, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
          ],
        },
      ],
    };

    // this.setState ({dataBar: dataBar});
    return dataBar;
  };
  render () {
    const {data, metric} = this.props;
    // const renderData = () => {
    //   this.setState ({
    //     dataBar: this.setDataBar (labels, data),
    //   });
    //   return this.dataBar;
    // };
    console.log ('labels: ', data);
    console.log ('labels: ', metric);
    return (
      <MDBContainer>
        <h3 className="mt-5">Top 25 từ khóa hot</h3>
        <Bar
          data={this.convertData (this.getRenderValue (data, metric), metric)}
          options={this.state.barChartOptions}
        />
      </MDBContainer>
    );
  }
}

export default ChartsPage;

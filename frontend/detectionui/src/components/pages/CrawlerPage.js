import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBTableHead,
  MDBTableBody,
  MDBTable,
} from 'mdbreact';
import CrawlButton from './sections/CrawlButton';
import fake_data from '../../data.json';
import styles from './styles.module.css';
import DataTable from './sections/DataTable';
import {PropTypes} from 'react';

class CrawlerPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {},
      headers: [],
      number_of_articles: 0,
    };
  }

  getNumberOfArticles = dict => {};

  getDataFromChild = childData => {
    console.log ('getdatafromchild', childData);
    this.setState ({
      data: childData,
      categories: Object.keys (childData),
      headers: [
        'index',
        ...Object.keys (Object.values (Object.values (childData)[0])[0]),
      ],
      number_of_articles: this.getCat (childData).length,
      loading: false,
    });
  };

  getCat = data => {
    // console.log ('get_cat:', data);
    let articles = [];
    for (let key in data) {
      articles.push (...data[key]);
    }
    console.log ('articles:', articles);
    return articles;
  };
  get_cell = (key, value) => {
    console.log (key, value);
    return <td className={styles.truncate}>hello</td>;
  };
  get_row = article => {
    for (let [key, value] of Object.entries (article)) {
      // console.log ('key:value', key, value);
      this.get_cell (key, value);
    }
  };

  getArticles = articles => {
    // console.log ('getArticle');
    articles.map (article => {
      // return <tr>{this.get_row (article)}</tr>;
      return <tr>hello</tr>;
    });
  };

  get_col = list_col => {
    return list_col.map (col => <th>{col}</th>);
  };

  render () {
    // const item = ['AC', 'SD', 'SD'];
    // const item = Object.values (this.state.data);
    // console.log (item);
    // const item = Object.values (this.state.data);
    // this.setState ({
    //   data: Object.values (Data),
    // });
    // const item = Data;
    // console.log ('item: ', item);
    // const fake_data = {
    //   cat1: [
    //     {
    //       id: 1,
    //       name: 'name1',
    //     },
    //     {
    //       id: 2,
    //       name: 'name2',
    //     },
    //   ],
    //   cat2: [
    //     {
    //       id: 3,
    //       name: 'name1',
    //     },
    //     {
    //       id: 4,
    //       name: 'name2',
    //     },
    //   ],
    // };
    // const categories = Object.keys (fake_data);
    // const headings = Object.keys (
    //   Object.values (Object.values (fake_data)[0])[0]
    // );

    // console.log ('data', fake_data);
    // console.log ('categories', Object.keys (fake_data));
    // console.log (
    //   'headers',
    //   Object.keys (Object.values (Object.values (fake_data)[0])[0])
    // );
    // console.log ('test', Object.values (Object.values (fake_data)));
    const headers = [];
    const data = {};
    return (
      <React.Fragment>
        <MDBRow>
          <MDBCol md="12">
            <CrawlButton parentCallback={this.getDataFromChild} />
            <MDBCard className="mt-5">
              <MDBView className="gradient-card-header blue darken-2">
                <h4 className="h4-responsive text-white">
                  <strong>Articles List</strong>
                </h4>
                <h3>
                  <strong>
                    Number of articles:
                    {this.state.number_of_articles}
                  </strong>
                </h3>
              </MDBView>
              <MDBCardBody>

                <DataTable
                  headings={this.state.headers}
                  rows={this.getCat (this.state.data)}
                />
                {console.log (this.state.headers)}

              </MDBCardBody>

            </MDBCard>
          </MDBCol>
        </MDBRow>

      </React.Fragment>
    );
  }
}

export default CrawlerPage;

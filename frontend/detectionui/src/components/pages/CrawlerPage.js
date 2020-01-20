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

class CrawlerPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {},
    };
  }

 

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
            <MDBCard className="mt-5">
              <MDBView className="gradient-card-header blue darken-2">
                <h4 className="h4-responsive text-white">Basic tables</h4>
              </MDBView>
              <MDBCardBody>

                <h3 className="mt-5 text-left">
                  <strong>Striped rows.</strong>
                </h3>
                <p>
                  Use prop striped to add zebra-striping to any table row within the table body
                </p>
                <MDBTable striped responsive>
                  <MDBTableHead>
                    <tr>
                      {/* {this.get_col (this.state.header)} */}
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {/* {this.getArticles (this.getCat (this.state.data))} */}
                  </MDBTableBody>
                </MDBTable>

              </MDBCardBody>

            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <CrawlButton parentCallback={this.getDataFromChild} />
          {/* <p>{this.state.data}</p> */}
          <MDBCard>
            <MDBCardBody>
              {/* {this.getArticles (this.getCat (this.state.data))} */}
              <DataTable
                headings={this.state.headers}
                rows={this.getCat (this.state.data)}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </React.Fragment>
    );
  }
}

export default CrawlerPage;

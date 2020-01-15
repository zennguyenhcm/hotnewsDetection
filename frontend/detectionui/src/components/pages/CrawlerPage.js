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

class CrawlerPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {},
    };
  }

  getDataFromChild = childData => {
    console.log ('getdatafromchild', childData);
    this.setState ({
      data: childData,
    });
    // console.log ('getDataFromChild');
    console.log ('getdatafromchild', this.state.data);
  };

  getCat = data => {
    console.log ('get_cat:', data);
    let articles = [];
    for (let key in data) {
      articles.push (data[key]);
    }
    console.log ('articles:', articles);
    return articles;
  };

  getArticles = list_article_arr => {
    // console.log ('getArticle');
    return list_article_arr.map (article_arr => {
      return article_arr.map (article => <p>{article['title']}</p>);
    });
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
                {/* <MDBTable striped>
                  <MDBTableHead>
                    <tr />
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable> */}

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
              {this.getArticles (this.getCat (fake_data))}
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </React.Fragment>
    );
  }
}

export default CrawlerPage;

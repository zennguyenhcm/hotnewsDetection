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

class CrawlerPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {},
    };
  }

  getDataFromChild = childData => {
    // console.log ('getdatafromchild', childData);
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
    return articles;
  };

  getArticles = articles => {
    console.log ('getArticle');
    articles.map (article => <p>{article}</p>);
  };

  render () {
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
              {this.getArticles (this.getCat (this.data))}
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </React.Fragment>
    );
  }
}

export default CrawlerPage;

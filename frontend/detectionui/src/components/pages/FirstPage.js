import React from 'react';
import {
  MDBCard,
  MDBCol,
  MDBRow,
  MDBView,
  MDBMask,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
  MDBIcon,
} from 'mdbreact';
import srcLogo from '../../assets/logocafef.png';

const FirstPage = () => {
  return (
    <React.Fragment>
      <MDBCol md="6" lg="9" className="align-middle">
        <section className="text-center pb-3">
          <MDBRow className="d-flex">
            <MDBCol lg="6" xl="5" className="mb-3">

              <MDBCard className="d-flex mb-5">
                <MDBView>
                  <img src={srcLogo} alt="Project" className="img-fluid" />
                  <MDBMask overlay="white-slight" />
                </MDBView>
                <MDBCardBody>
                  <MDBCardTitle className="font-bold mb-3">
                    <strong>CafeF</strong>
                  </MDBCardTitle>
                  <MDBCardText>
                    <p>http://cafef.vn/</p>
                    <p>Kênh thông tin kinh tế - tài chính Việt Nam</p>
                  </MDBCardText>
                </MDBCardBody>
                <MDBCardFooter className="links-light profile-card-footer">
                  <MDBBtn color="info">
                    <span className="right">
                      <a className="p-2" href="#profile">
                        Live Preview
                        <MDBIcon icon="image" className="ml-1" />
                      </a>
                    </span>
                  </MDBBtn>

                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="6" xl="5" className="mb-3">
              <MDBBtn
                tag="a"
                size="lg"
                floating
                gradient="purple"
                className="text-center"
                onClick={() => {
                  alert ('This feature is unavaible now!');
                }}
              >
                <MDBIcon icon="plus" />
              </MDBBtn>

            </MDBCol>

          </MDBRow>

        </section>
      </MDBCol>
    </React.Fragment>
  );
};

export default FirstPage;

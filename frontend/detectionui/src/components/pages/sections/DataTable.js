import * as React from 'react';
import Cell from './Cell';
import {MDBTable, MDBTableHead, MDBTableBody} from 'mdbreact';

export default class DataTable extends React.Component {
  renderHeadingRow = item => {
    return <Cell content={item} header={true} />;
  };

  renderRow = row => {
    return (
      <tr>
        {Object.values (row).map (value => {
          return <Cell content={value} />;
        })}
      </tr>
    );
  };

  render () {
    const {rows, headings} = this.props;

    const theadMarkup = (
      <tr key="heading">
        {headings.map (item => this.renderHeadingRow (item))}
      </tr>
    );
    console.log ('headings_theadMarkup', headings);
    const tbodyMarkup = rows.map (this.renderRow);
    return (
      <MDBTable striped responsive>
        <MDBTableHead>
          {console.log ('hello from datatable mdbtablehead')}
          {theadMarkup}
        </MDBTableHead>
        <MDBTableBody>{tbodyMarkup}</MDBTableBody>
      </MDBTable>
    );
  }
}

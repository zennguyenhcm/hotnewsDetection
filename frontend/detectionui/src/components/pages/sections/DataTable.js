import * as React from 'react';
import Cell from './Cell';
import {MDBTable, MDBTableHead, MDBTableBody} from 'mdbreact';

export default class DataTable extends React.Component {
  renderHeadingRow = header => {
    return <Cell content={header} />;
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
    const {headings, rows} = this.props;
    const theadMarkup = ({headings = []}) => (
      <tr key="heading">
        {headings.map (this.renderHeadingRow)}
      </tr>
    );
    const tbodyMarkup = rows.map (this.renderRow);
    return (
      <MDBTable striped responsive>
        <MDBTableHead>{theadMarkup}</MDBTableHead>
        <MDBTableBody>{tbodyMarkup}</MDBTableBody>
      </MDBTable>
    );
  }
}

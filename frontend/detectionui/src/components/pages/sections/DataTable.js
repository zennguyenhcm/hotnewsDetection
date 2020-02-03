import * as React from 'react';
import Cell from './Cell';
import {MDBTable, MDBTableHead, MDBTableBody} from 'mdbreact';

export default class DataTable extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      index: 1,
    };
  }
  renderHeadingRow = item => {
    return <Cell content={item} header={true} />;
  };

  renderRow = (row, index) => {
    // const index = this.state.index;
    const array = Object.values (row);
    const new_row = [index, ...array];
    console.log ('new_row', new_row);

    return (
      <tr>

        {new_row.map (value => {
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
    // this.renderRow = this.renderRow.bind(this)

    const tbodyMarkup = rows.map ((item, index) => {
      return this.renderRow (item, index);
    });

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

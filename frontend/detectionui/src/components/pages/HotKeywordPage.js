import React from 'react';
import HotKeywordTable from './sections/HotKeywordTable';
import DetectButton from './sections/DetectButton';

class HotKeywordPage extends React.Component {
  getDataFromChild = childData => {
    console.log ('getdatafromchild', childData);
    this.setState (
      {
        data: childData,
      },
      () => {
        console.log ('getDataFromChild', this.state.data);
      }
    );
  };
  render () {
    return (
      <React.Fragment>
        <HotKeywordTable />
        <DetectButton parentCallback={this.getDataFromChild} />
      </React.Fragment>
    );
  }
}

export default HotKeywordPage;

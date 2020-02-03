import React from 'react';
import HotKeywordTable from './sections/HotKeywordTable';
import DetectButton from './sections/DetectButton';
import ListTable from './sections/ListTable';

class HotKeywordPage extends React.Component {
  // renderHotKeywordTable = categories => {
  //   console.log ('render_hello');
  //   return (
  //     <div>
  //       {categories.map (value => {
  //         return <p>Hello</p>;
  //       })}
  //     </div>
  //   );
  // };
  constructor (props) {
    super (props);
    this.state = {};
  }

  getDataFromChild = childData => {
    console.log ('getdatafromchild', childData);
    this.setState ({
      data: childData,
      categories: Object.keys (childData),
    });
  };

  render (props) {
    const fake_data = {
      cat1: ['kw11', 'kw12', 'kw13'],
      cat2: ['kw21', 'kw22', 'kw23'],
      cat3: ['kw31', 'kw32', 'kw33'],
    };
    return (
      <React.Fragment>
        <DetectButton parentCallback={this.getDataFromChild} />

        {this.state.data
          ? <div>
              {console.log (this.state.categories)}
              {Object.entries (this.state.data).map (([key, value]) => (
                <HotKeywordTable catName={key} kwData={value} />
              ))}
            </div>
          : <div />}
        {/* {
          <div>
            {console.log (this.state.categories)}
            {Object.entries (fake_data).map (([key, value]) => (
              <HotKeywordTable catName={key} kwData={value} />
            ))}
          </div>
        } */}
      </React.Fragment>
    );
  }
}

export default HotKeywordPage;

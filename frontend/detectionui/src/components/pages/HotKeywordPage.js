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

  getCategoryName = categoryId => {
    let categoryName = '';
    switch (categoryId) {
      case '1':
        categoryName = 'Thời sự';
        break;
      case '2':
        categoryName = 'Thị trường chứng khoán';
        break;
      case '3':
        categoryName = 'Bất động sản';
        break;
      case '4':
        categoryName = 'Doanh nghiệp';
        break;
      case '5':
        categoryName = 'Tài chính - Ngân hàng';
        break;
      case '6':
        categoryName = 'Tài chính quốc tế';
        break;
      case '7':
        categoryName = 'Kinh tế vĩ mô';
        break;
      case '8':
        categoryName = 'Hàng hóa - Nguyên liệu';
        break;
      default:
        categoryName = '';
    }
    return categoryName;
  };
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
        <div style={{color: 'red', fontSize: '32px'}}><b>Tin nóng</b></div>
        {this.state.data
          ? <div>
              {console.log (this.state.categories)}
              {Object.entries (this.state.data).map (([key, value]) => (
                <HotKeywordTable
                  catName={this.getCategoryName (key)}
                  kwData={value}
                />
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

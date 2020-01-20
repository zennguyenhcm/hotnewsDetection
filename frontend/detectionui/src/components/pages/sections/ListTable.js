import * as React from 'react';
import HotKeywordTable from './HotKeywordTable';

export default class ListTable extends React.Component {
  renderKeywordTable = cat => {
    console.log ('hello_renderKeywordTable');
    return <HotKeywordTable catName={cat} />;
  };

  render () {
    console.log ('Hello_render');
    const renderTable = ({cat = []}) => {
      console.log ('Hellocat', cat);
      //   return (
      //     <div key="category">
      //       {categories.map (this.renderKeywordTable)}
      //     </div>
      //   );
    };

    return (
      <div>
        {renderTable}
      </div>
    );
  }
}

import * as React from 'react';

class NewsViewer extends React.Component {
  render () {
    const {data} = this.props;
    return (
      <div>
        {Object.values (data).map (item => {
          console.log ('item', item);
          console.log ('type of item', typeof item);
          console.log ('value', item[0]);
          return (
            <div>

              <p>{item[0]}</p>
              <p>{item[1]}</p>
              <p>{item[2]}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
export default NewsViewer;

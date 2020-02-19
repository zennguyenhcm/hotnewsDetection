import * as React from 'react';

class NewsViewer extends React.Component {
  render () {
    const {data} = this.props;
    return (
      <div>
        <ul>
          {Object.values (data).map (item => {
            console.log ('item', item);
            console.log ('type of item', typeof item);
            console.log ('value', item[0]);
            return (
              <li className="row">
                <div className="col-2">
                  <span style={{fontSize: '12px'}}>
                    {item[0]}
                  </span>
                </div>

                <span>|</span>
                <div className="col">
                  {' '}<a title={item[1]} href={item[2]}>
                    <span style={{fontSize: '14px'}}>{item[1]}</span>
                  </a>
                </div>

              </li>
            );
          })}
        </ul>

      </div>
    );
  }
}
export default NewsViewer;

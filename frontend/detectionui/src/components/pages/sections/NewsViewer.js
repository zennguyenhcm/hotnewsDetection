import * as React from 'react';

class NewsViewer extends React.Component {
  render () {
    const {data, algo_name} = this.props;
    console.log ('key: ', algo_name);
    if (algo_name === 'tatfidf') {
      return (
        <div>
          <ul>
            {Object.values (data).map (item => {
              return (
                <li className="row">
                  <div className="col-2">
                    <span style={{fontSize: '12px'}}>
                      {item[0]}
                    </span>
                  </div>

                  <div
                    className="col"
                    style={{
                      'border-left': '1px solid black',
                      height: 'auto',
                    }}
                  >
                    <a title={item[1]} href={item[2]}>
                      <span style={{fontSize: '16px'}}>
                        <b style={{color: 'blue'}}>{item[1]}</b>
                      </span>
                    </a>
                    <hr />
                  </div>
                </li>
              );
            })}
          </ul>

        </div>
      );
    } else if (algo_name === 'tfidf') {
      return (
        <div>
          <ul>
            {Object.values (data).map (item => {
              return (
                <li className="row">
                  <div className="col-2">
                    <span style={{fontSize: '12px'}}>
                      {item['published_date']}
                    </span>
                  </div>

                  <div
                    className="col"
                    style={{
                      'border-left': '1px solid black',
                      height: 'auto',
                    }}
                  >
                    <a
                      target="_blank"
                      title={
                        'Like: ' +
                          item['fb_like'] +
                          '\nShare: ' +
                          item['fb_share'] +
                          '\nComment: ' +
                          item['fb_comment'] +
                          '\nTotal: ' +
                          item['fb_total'] +
                          '\nView: ' +
                          item['page_view'] +
                          '\nKeywords: ' +
                          item['keyword']
                      }
                      href={item['url']}
                    >
                      <span style={{fontSize: '16px'}}>
                        <b style={{color: 'blue'}}>{item['title']}</b>
                      </span>
                    </a>
                    <hr />
                  </div>

                </li>
              );
            })}
          </ul>
        </div>
      );
    } else return <div>{console.log (null)}<p>null</p></div>;
  }
}
export default NewsViewer;

import * as React from 'react';

class CrawlButton extends React.Component {
  // componentDidMount () {
  //   fetch ('http://127.0.0.1:5050/crawler').then (res => res.json ()).then (
  //     result => {
  //       alert (result);
  //     },
  //     error => {
  //       alert (error);
  //     }
  //   );
  // }
  constructor (props) {
    super (props);
    this.state = {
      loading: '',
    };
  }
  onClick = () => {
    this.setState ({loading: true}, this.crawlData);
  };
  crawlData = () => {
    fetch ('http://127.0.0.1:5050/crawler', {mode: 'cors'})
      .then (response => {
        // Convert to JSON
        this.setState ({loading: false});
        return response.json ();
      })
      .then (j => {
        // Yay, `j` is a JavaScript object
        console.log ('child: "hello"');
        // console.log (j);
        this.props.parentCallback (j);
      })
      .catch (error => {
        console.log ('error');
        // console.log ('Request failed', error);
        alert (error);
      });
    // return ['AC', 'SD', 'SD'];
  };
  render () {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            this.onClick ();
          }}
        >
          Crawl
        </button>
        {this.state.loading
          ? <div className="spinner-border" role="status">
              {console.log ('loading', this.state.loading)}
              <span className="sr-only">Loading...</span>
            </div>
          : <div />}
      </div>
    );
  }
}

export default CrawlButton;

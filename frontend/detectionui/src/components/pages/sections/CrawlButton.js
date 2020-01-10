import * as React from 'react';
import CrawlerPage from '../CrawlerPage';
import {findAllByAltText} from '@testing-library/react';

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
  crawlData = () => {
    fetch ('http://127.0.0.1:5050/crawler', {mode: 'cors'})
      .then (response => {
        // Convert to JSON
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
  };
  render () {
    return (
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => {
          this.crawlData ();
        }}
      >
        Crawl
      </button>
    );
  }
}

export default CrawlButton;

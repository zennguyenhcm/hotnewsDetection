import * as React from 'react';

class DetectButton extends React.Component {
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
  getData = () => {
    fetch ('http://127.0.0.1:5050/hotKeywordAnalyzer', {mode: 'cors'})
      .then (response => {
        // Convert to JSON
        console.log (response);
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
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          this.getData ();
        }}
      >
        Analyze
      </button>
    );
  }
}

export default DetectButton;

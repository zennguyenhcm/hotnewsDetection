import * as React from 'react';

class TatfidfButton extends React.Component {
  analyze = () => {
    fetch ('http://127.0.0.1:5050/tatfidf', {mode: 'cors'})
      .then (response => {
        return response.json ();
      })
      .then (data => {
        console.log ('success', data);
        this.props.parentCallback (data);
      })
      .catch (error => {
        console.log ('error');
        alert (error);
      });
  };
  render () {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          this.analyze ();
        }}
      >
        Analyze
      </button>
    );
  }
}

export default TatfidfButton;

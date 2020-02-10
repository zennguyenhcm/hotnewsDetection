import React from 'react';

class WordCloudGenerateButton extends React.Component {
  getData = () => {
    fetch ('http://127.0.0.1:5050/wordCloud', {mode: 'cors'})
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
          this.getData ();
        }}
      >
        Generate
      </button>
    );
  }
}

export default WordCloudGenerateButton;

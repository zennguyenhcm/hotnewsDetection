import * as React from 'react';
import styles from '../styles.module.css';

function showForm () {
  return (
    <div>
      <button type="button" class="collapsible">Open Collapsible</button>
      <div class="content">
        <p>Lorem ipsum...</p>
      </div>
    </div>
  );
}
export default function KeywordCell({content}) {
  return <td>{content}<i class="fas fa-cat" onClick={showForm ()} /></td>;
}

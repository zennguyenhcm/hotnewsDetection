import React, {useState} from 'react';
import {MDBCollapse} from 'mdbreact';

// function showForm () {
//   return (
//     <div>
//       <button type="button" class="collapsible">Open Collapsible</button>
//       <div class="content">
//         <p>Lorem ipsum...</p>
//       </div>
//     </div>
//   );
// }

export default function KeywordCell({content, news}) {
  const [collapseID, setCollapseID] = useState ('');
  const toggleCollapse = collapseID => {
    console.log ('click');
    console.log (collapseID);
    collapseID === ''
      ? setCollapseID ((collapseID = 'basicCollapse'))
      : setCollapseID ((collapseID = ''));
    console.log (collapseID);
  };

  return (
    <div>
      <td>
        {content}
        <i class="fas fa-cat" onClick={() => toggleCollapse (collapseID)} />
      </td>
      <MDBCollapse id="basicCollapse" isOpen={collapseID}>
        <p>
          {console.log ('render_collapse')}
          {news}
        </p>
      </MDBCollapse>
    </div>
  );
}

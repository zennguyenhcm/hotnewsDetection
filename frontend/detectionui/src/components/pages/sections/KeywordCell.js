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

const getArticleInfo = arr => {
  return (
    <div>
      {console.log (arr)}
      <p>Category: {arr[4]}</p>
      <p>Title: {arr[5]}</p>
      <p>Link: {arr[6]}</p>
      <p>Like rates: {arr[2]}</p>
      <p>Keywords: {arr[7]}</p>
    </div>
  );
};
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
        <div>
          {console.log ('render_collapse')}
          {console.log (news)}
          {news.map (item => (
            <div>
              bài:
              <p>
                {console.log ('item', Object.values (item))}
                {Object.values (item)}
              </p>
            </div>
          ))}
        </div>
      </MDBCollapse>
    </div>
  );
}

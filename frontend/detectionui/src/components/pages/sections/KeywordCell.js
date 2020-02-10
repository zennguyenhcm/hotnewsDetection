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

const getArticleInfo = str => {
  console.log ('string', str);
  let arr = str.toString ().split ('~~~');
  return (
    <div>
      {console.log (arr)}
      <p>Category: {arr[4]}</p>
      <p>Title: {arr[5]}</p>
      <a href={arr[6]}>Link: {arr[6]}</a>
      <p>Like rates: {arr[2]}</p>
      <p>Keywords: {arr[7]}</p>
      <hr />
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
        {console.log ('type of content ', typeof Object.values (content))}
        {Object.values (content)}
        <i class="fas fa-cat" onClick={() => toggleCollapse (collapseID)} />
      </td>
      <MDBCollapse id="basicCollapse" isOpen={collapseID}>
        <div>
          {console.log ('render_collapse')}
          {console.log (news)}
          {news.map (items => (
            <div>
              bài:
              <div>
                {console.log ('item', Object.values (items))}
                {Object.values (items).map (item => getArticleInfo (item))}
              </div>
            </div>
          ))}
        </div>
      </MDBCollapse>
    </div>
  );
}

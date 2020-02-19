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
const getLightenDarkenColor = (col, amt) => {
  var num = parseInt (col, 16);
  var r = (num >> 16) + amt;
  var b = ((num >> 8) & 0x00ff) + amt;
  var g = (num & 0x0000ff) + amt;
  var newColor = g | (b << 8) | (r << 16);
  return newColor.toString (16);
};

const getArticleInfo = (str, index) => {
  console.log ('string', str);
  let arr = str.toString ().split ('~~~');
  let new_fool_number = parseInt (index) + 1;
  var color = getLightenDarkenColor ('B52C2C', 12 * new_fool_number);
  console.log ('color', color);
  console.log ('index', typeof parseInt (new_fool_number));
  return (
    <div style={{backgroundColor: '#' + color.toString ()}}>
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
    <td>
      <span
        class="d-flex flex-row"
        style={{
          width: '100%',
        }}
      >
        <span>Từ khóa: <b>{Object.values (content)}</b></span>
        <i
          class="fa fa-eye p-2"
          onClick={() => toggleCollapse (collapseID)}
          style={{position: 'absolute', right: 0}}
        />
      </span>
      <MDBCollapse id="basicCollapse" isOpen={collapseID}>
        <div>
          {console.log ('render_collapse')}
          {console.log (news)}
          {news.map ((items, index) => (
            <div>
              <str>Bài báo liên quan:</str>
              <div>
                {console.log ('item_baibaoienquan', items)}

                {Object.entries (items).map (key =>
                  getArticleInfo (key[1], key[0])
                )}
              </div>
            </div>
          ))}
        </div>
      </MDBCollapse>

    </td>
  );
}

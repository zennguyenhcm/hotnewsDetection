import * as React from 'react';
import styles from '../styles.module.css';
const text_truncate = (str, length, endings) => {
  console.log ('hello_truncate');
  if (length == null) {
    length = 100;
  }
  if (endings == null) {
    endings = '...';
  }
  if (str.length > length) {
    console.log ('string is too long: ');
    let shorted_str = str.substr (0, length - endings.length) + endings;
    console.log ('string is too long: ', shorted_str);
    return shorted_str;
  } else {
    console.log ('lenght', str.length);
    console.log ('string is not too long');
    return str;
  }
};
export default function Cell({content, header}) {
  const state = {showForm: false};

  const cellMarkup = header
    ? <th>
        {content}
      </th>
    : <td>
        {text_truncate (content.toString (), 50)}
      </td>;

  return cellMarkup;
}

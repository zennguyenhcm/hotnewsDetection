import * as React from 'react';
import styles from '../styles.module.css';

export default function Cell({content, header}) {
  const state = {showForm: false};

  const cellMarkup = header
    ? <th>
        {content}
      </th>
    : <td>
        {content}
      </td>;

  return cellMarkup;
}

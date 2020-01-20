import * as React from 'react';
import styles from '../styles.module.css';

export default function Cell({content}) {
  const state = {showForm: false};
  return <td>{content}</td>;
}

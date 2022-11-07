import React from 'react';
import s from '../../styles.module.css';

export const Notification = ({ msg }) => {
  return <h2 className={s.Notification}>{msg}</h2>;
};

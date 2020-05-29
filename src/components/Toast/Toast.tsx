import React from 'react';
import css from './Toast.module.css';

type ToastType = {
  title: string;
  isActive: boolean;
  message: string;
  color: string;
  background: string;
};

const Toast = (props: ToastType) => (
  <section className={`${css.container} ${props.isActive ? css.active : ''}`}>
    <div className={css.title}>{props.title}</div>
    <div className={css.message}>{props.message}</div>
  </section>
);

export default Toast;

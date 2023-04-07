 import React from 'react';
 
 import style from '@styles/components/inputs/input.module.scss'


 interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{ 
  children?: React.ReactNode,
  typeS?: 'primal' | 'danger',
}

 export function Input({className, children, ...htmlInput}: InputProps) {
  return (
      <input className={`${style.input} ${className}`} {...htmlInput}>
        {children}
      </input>
  );
 }
 

import React from 'react';

import style from '@styles/components/buttons/button.module.scss'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{ 
  children: React.ReactNode,
  typeS?: 'primal' | 'danger',
}

export function Button ({ className, typeS, children, ...htmlButton}: ButtonProps) {
  return (
    <span>
      <button {...htmlButton}
        className={`${style.button} ${className} ${typeS? style[typeS]: ''}`}>
        {children}
      </button>
    </span>
  );
}


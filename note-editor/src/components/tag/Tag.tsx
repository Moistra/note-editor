import React from 'react';

import style from '@styles/components/_tag.module.scss'



interface TagProp extends React.HTMLAttributes<HTMLSpanElement>{ 
  children: React.ReactNode,
}

export type tagType = typeof Tag


export function Tag({children, ...tagProp}:TagProp) {
  return (
      <span className={style.tag} {...tagProp}>
          {children}
      </span>
  );
}


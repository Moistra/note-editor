import React from 'react';


import style from '@styles/layout/_header.module.scss';



export function Header() {
  return (
    <header className={style.header}>
        <div className={style.logo}>
          Note Editor
        </div>  
      </header>
  );
}


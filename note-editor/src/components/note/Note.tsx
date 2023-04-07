import React, { ReactNode } from 'react';
import {NoteType} from '../../types/'

import style  from '@styles/layout/note.module.scss'
import { Tag } from '../tag/Tag';

interface NoteProp { 
  children?: ReactNode,
  note: NoteType
}

export function Note({children, note }: NoteProp) {
  return (
    <article className={style.wrapper}>
      <h3 className={style.title}>{note.title}</h3>
      <span><Tag>place for edit button!!!!!</Tag> </span>
      <p className={style.description}>{note.description}</p>


      {children}
    </article>
  );
}

import React, { ReactNode } from "react";
import { NoteType } from "../../types/";
import { convertTextToTagElement } from "@utils/";

import style from "@styles/layout/note.module.scss";
import { Tag} from "@components/";

interface NoteProp {
  note: NoteType;
  onEdit: () => void;
  onDelete: () => void;
}

export function Note({ note, onEdit, onDelete }: NoteProp) {
  return (
    <article className={style.wrapper}>
      <div className={style["edit-wrapper"]}>
        <button className={style["edit-button"]} onClick={() => onEdit()}>
          &#9998;
        </button>
        <div className={style.divider}></div>
        <button className={style["delete-button"]} onClick={() => onDelete()}>
          &#10006;
        </button>
      </div>
      <div className={style["title-wrapper"]}>
        <h3 className={style.title}>{note.title}</h3>
      </div>

      <div className={style.description}>
        <p>{...convertTextToTagElement(note.description)}</p>
      </div>

      <ul className={style["tags-wrapper"]}>
        {note.tags.length > 0
          ? note.tags.map((tag) => (
              <li key={tag} className={style["tag-item"]}>
                <Tag>{tag}</Tag>
              </li>
            ))
          : ""}
      </ul>
    </article>
  );
}

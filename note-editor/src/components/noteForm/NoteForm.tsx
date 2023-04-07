import { ChangeEventHandler, useLayoutEffect, useState } from "react";
import { convertToTags } from "@utils/";
import { Button, Input } from "@components/";
import { NoteType } from "../../types";

import style from "@styles/layout/_note-form.module.scss";

interface NoteFormProps {
  setNotes: (notes: NoteType) => void;
  type?: 'create' | 'edit'
}

export function NoteForm({ setNotes, type = 'edit' }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");

  const titleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle((prev) => e.target.value);
  };

  const descriptionHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription((prev) => e.target.value);
  };

  const onCreateHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    let convertedDescription = convertToTags(description);
    const note: NoteType = {
      title: title,
      description: convertedDescription,
    };

    setNotes(note);
  };

  return (
    <>
      <div className={style.wrapper} onClick={(e) => e.stopPropagation()}>
        <h3>Create form</h3>

        <Input
          className={style.input}
          type="text"
          autoFocus={true}
          placeholder="title"
          onChange={titleHandler}
          required={true}
          value={title}
        ></Input>

        <textarea
          placeholder="description"
          onChange={descriptionHandler}
          required={true}
          value={description}
        />
      </div>

      <Button
        typeS="primal"
        onClick={onCreateHandler}
        className={style.submit_button}
      >
        {type[0].toUpperCase() + type.slice(1)}
      </Button>
    </>
  );
}

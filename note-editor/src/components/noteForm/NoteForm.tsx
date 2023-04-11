import { ChangeEventHandler, useLayoutEffect, useState } from "react";
import { searchTags, convertTextToTagElement } from "@utils/";
import { Button, Input } from "@components/";
import { NoteType } from "@customTypes/";

import style from "@styles/layout/note-form.module.scss";

interface NoteFormProps {
  value?: NoteType | null;
  setNotes: (notes: NoteType) => void;
  
}

export function NoteForm({ setNotes, value = null }: NoteFormProps) {

  const [title, setTitle] = useState(value ? value.title : '');
  const [description, setDescription] = useState(value ? value.description : '');


  const isValidData = () => {
    if (title.trim().length > 0 && description.trim().replaceAll('#', '').length > 0)
      return true;
    else
      return false;
  }

  const titleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(prev => e.target.value);
  };

  const descriptionHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription(prev => e.target.value);
  };

  const onCreateHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const tags = searchTags(description);
    const note: NoteType = {
      id: value ? value.id : Math.random(),
      title: title,
      description: description,
      tags: tags,
    };

    setNotes(note);
    setTitle('');
    setDescription('');
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
          className={style.textarea}
          placeholder="description"
          onChange={descriptionHandler}
          required={true}
          value={description}
        />
      </div>

      <Button
        typeS={isValidData() ? 'success' : 'danger'}
        disabled={!isValidData()}
        onClick={onCreateHandler}
        className={style.submit_button}
      >
        {value ? 'Edit' : 'Create'}
      </Button>
    </>
  );
}

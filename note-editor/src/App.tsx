import { useState, useEffect, useLayoutEffect } from "react";
import {
  Header,
  Note,
  NoteForm,
  Modal,
  Tag,
  Button,
  Select
} from "@components/";

import { NoteType, SelectOption } from "@types/";

import {hasArray} from "@utils/"

import style from "@styles/main.module.scss";




function App() {
  const [notes, setNotes] = useState<NoteType[] | null>(null);
  const [tags, setTags] = useState<string[]>([])


  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<NoteType | null>(null);

  const [selectValue, setSelectValue] = useState<SelectOption[]>([]);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);

  const updateListOfNotes = (note: NoteType) => {
    if (notes !== null) 
      setNotes([...notes.filter((oldNote)=> oldNote.id !== note.id), note]);
    else 
      setNotes([note])
    
    updateListOfTags(note.tags)
  };


  const updateListOfTags = (newTags: string[]) => {
    setTags([...new Set([...tags, ...newTags])])
  }

  useEffect(() => {
    console.log(tags)
    let options: SelectOption[] = []
    for (let tag of tags) {
        options.push({value: tag, label: tag})
    }
    setSelectOptions(options)
    console.log(selectOptions)
  }, [tags]);


  const onEditNote = (note: NoteType) => {
    setModalValue(note)
    setOpenModal(true);
  }

  return (
    <div className={style.app}>
      <Header />
      <main className={style.content}>


        <div className={style.functionality}>
          <Button onClick={() => {
            setModalValue(null)
            setOpenModal(true)
          }}>New note</Button>
        <Select
          options={selectOptions}
          isMultiple = {true}
          value={selectValue}
          onChange={option => setSelectValue(option)}
        />
        </div>

      
        

        <div>
          {isOpenModal && (
            <Modal closeModal={() => setOpenModal(false)} isOpen={isOpenModal}>
              <NoteForm setNotes={updateListOfNotes} value={modalValue}/>
            </Modal>
          )}
        </div>

    

        {notes !== null
          ? notes.filter((note) => hasArray(note.tags, selectValue.map(el => el.label)))
            .map((note: NoteType) => {
              return <Note key={note.id}
                note={note}
                onEdit={() => onEditNote(note)} />;
        }): ''}
      </main>
    </div>
  );
}

export default App;

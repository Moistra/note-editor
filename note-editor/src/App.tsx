import { useState, useEffect} from "react";
import {
  Header,
  Note,
  NoteForm,
  Modal,
  Button,
  Select,
  Footer
} from "@components/";
import { hasArray } from "@utils/";
import { NoteType, SelectOption } from "@types/";

import style from "@styles/main.module.scss";


function App() {
  const [notes, setNotes] = useState<NoteType[] | null>(null);
  const [tags, setTags] = useState<string[]>([])

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [noteForEdit, setNoteForEdit] = useState<NoteType | null>(null);

  const [selectValue, setSelectValue] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (notes) {
      let newTags = notes.reduce((updatedTags:string[], note) => {
        return updatedTags = [...new Set([...updatedTags, ...note.tags])]
      }, [])
      setTags(newTags)
    }
}, [notes])


  const addNewNote = (note: NoteType) => {
    if (notes !== null) 
      setNotes([...notes.filter((oldNote)=> oldNote.id !== note.id), note]);
    else 
      setNotes([note])
    
    addNewTags(note.tags)
  };

  const addNewTags = (newTags: string[]) => {
    setTags([...new Set([...tags, ...newTags])])
  }

  const editNote = (note: NoteType) => {
    setNoteForEdit(note)
    setOpenModal(true);
  }

  const deleteNote = (deleteNote: NoteType) => {
    if (notes) { 
      setNotes(notes.filter((note) => note.id !== deleteNote.id))
    }
  }

  return (
    <div className={style.app}>
      <Header />
      <main className={style.content}>

        <div className={style.functionality}>
          <div className={style["select-input"]}>
            <Select
              options={tags.map((tag)=> {return {value:tag, label:tag}})}
              isMultiple = {true}
              value={selectValue}
              onChange={option => setSelectValue(option)}
            />
          </div>
          <div className={style["create-button"]}>
            <Button
              onClick={() => {
                setNoteForEdit(null)
                setOpenModal(true)
              }}
            >
              Create note
            </Button>
          </div>
       </div>

        <div>
          {isOpenModal && (
            <Modal closeModal={() => setOpenModal(false)} isOpen={isOpenModal}>
              <NoteForm setNotes={addNewNote} value={noteForEdit}/>
            </Modal>
          )}
        </div>

        {notes !== null
          ? notes.filter((note) => hasArray(note.tags, selectValue.map(el => el.label)))
            .map((note: NoteType) => {
              return <Note key={note.id}
                note={note}
                onEdit={() => editNote(note)}
                onDelete={() => deleteNote(note)}
              />;
        }): ''}
      </main>
        <Footer></Footer>
    </div>
  );
}

export default App;

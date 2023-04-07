import { useState, useEffect } from "react";
import {
  Header,
  Note,
  NoteForm,
  Selector,
  Modal,
  Tag,
  Button,
  Select,
} from "@components/";

import { NoteType, SelectOption } from "@types/";

import style from "@styles/main.module.scss";

const testData = {
  title: "some title",
  description: ["text left", <Tag>#sometag</Tag>, "text right"],
};

const testOptions: SelectOption[] = [
  { value: 1, label: "first" },
  { value: 2, label: "second" },
  { value: 2, label: "second" },
  { value: 2, label: "second" },
];

function App() {
  const [notes, setNotes] = useState<NoteType[]>([testData]);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const [selectValue, setSelectValue] = useState< SelectOption[] >([testOptions[1]]);

  const updateListOfNotes = (note: NoteType) => {
    setNotes([...notes, note]);
  };

  useEffect(() => {
    console.log("EST CONTACT");
  }, [notes]);

  return (
    <>
      <Header />
      <main className={style.app}>
        <Selector>selector</Selector>

        <Button onClick={() => setOpenModal(true)}>New note</Button>

        <Select
          options={testOptions}
          isMultiple = {true}
          value={selectValue}
          onChange={option => setSelectValue(option)}
        />

        <div>
          {isOpenModal && (
            <Modal closeModal={() => setOpenModal(false)} isOpen={isOpenModal}>
              <NoteForm setNotes={updateListOfNotes}></NoteForm>
            </Modal>
          )}
        </div>

        <br></br>

        {notes.map((note: NoteType) => {
          return <Note key={Math.random()} note={note} />;
        })}
      </main>
    </>
  );
}

export default App;

import { ReactElement } from "react";


export type NoteType = {
  title: string;
  description: (string | ReactElement)[];
  tags?: string[];
}
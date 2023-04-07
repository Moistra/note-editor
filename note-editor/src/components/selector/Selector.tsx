import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import { useState, useRef } from "react";
import { Input } from "@components/";

import style from "@styles/components/_selector.module.scss";

interface SelectorProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

export function Selector({ children }: SelectorProps) {
  const [selectorState, setSelectorState] = useState("");

  let selectorHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    // e.stopPropagation;
    setSelectorState((prev) => e.target.value);
  };

  let selectorKeyHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {};

  return (
    <div className={style.selector}>
      <div className={style.selector__tag_wrapper}>
      {children}
      </div>
      <Input
        className={style.selector__input}
        type="text"
        onKeyDownCapture={selectorKeyHandler}
        value={selectorState}
        placeholder="search..."
        onChange={selectorHandler}
      ></Input>
    </div>
  );
}

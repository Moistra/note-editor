import React, { ReactNode } from "react";

import style from "@styles/layout/footer.module.scss";

interface FooterProps {
  child?: ReactNode;
}


export const Footer = ({child}: FooterProps) => {
  return (
    <footer className={style["footer-container"]}>
      <a className={style.link}
        href="https://github.com/Moistra/test-tasktracker"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link to a <span className={style["link-main"]}>GitHub repo</span>
      </a>
      {child}
    </footer>
  );
};



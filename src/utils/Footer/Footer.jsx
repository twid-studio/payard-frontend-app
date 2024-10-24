import React from "react";
import { Logo } from "../Logo/Logo";

import s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <h1 className="super-text">RTRTS TMPLATE*</h1>
      <div className={s.bottom + " container"}>
        <Logo className={s.footer__logo} />
        <span className={"micro-text shadow " + s.footer__description}>
          *retrats template - the ideal for creative work, featuring stunning
          components, video backgrounds, and fluid functionality. Retrats is a
          starter that propels you forward
        </span>
      </div>
    </footer>
  );
}

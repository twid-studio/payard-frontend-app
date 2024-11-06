import Link from "next/link";
import React from "react";

import s from "./Button.module.scss"
import clsx from "clsx";

export default function ButtonPricing({ blackTheme, type }) {
  const href = type === "personal" ? "business" : "personal"
  return (
    <div className={s.button_wrapper}>
    <Link href={`/pricing/${href}`} className={clsx(s.button, {
      [s.button_black]: blackTheme
    })}>
      <span className={s.bg} />
      {type === "personal"
        ? "View pricing for business account"
        : "View pricing for personal account"}
    </Link>
    </div>
  );
}

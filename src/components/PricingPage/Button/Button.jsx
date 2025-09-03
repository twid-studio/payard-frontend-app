import Link from "next/link";
import React, { useContext } from "react";

import s from "./Button.module.scss";
import clsx from "clsx";
import { DataContext } from "@/lib/providers/DataProvider/context";

export default function ButtonPricing({ blackTheme }) {
  const { data } = useContext(DataContext);
  const buttonGroup = data.buttonGroup;

  return (
    <div className={s.button_wrapper}>
      <Link
        href={`${buttonGroup.buttonLink}`}
        scroll={true}
        className={clsx(s.button, {
          [s.button_black]: blackTheme,
        })}
      >
        <span className={s.bg} />
        {/* {type === "personal"
        ? "View pricing for business account"
        : "View pricing for personal account"} */}
        {buttonGroup.buttonText}
      </Link>
    </div>
  );
}

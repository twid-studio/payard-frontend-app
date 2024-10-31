import clsx from "clsx";
import React, { useContext, useState } from "react";

import s from "./Menu.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { anim, MenuAnim } from "@/lib/helpers/anim";
import Link from "next/link";
import {
  ButtonBlack,
  ButtonMain,
  ButtonTransparent,
} from "@/utils/Button/Button";
import { ScrollContext } from "@/lib/providers/ScrollProvider/context";

const linksList = {
  top: [
    {
      text: "Banking",
      slug: "/",
    },
    {
      text: "Services",
      slug: "/",
    },
    {
      text: "Consulting",
      slug: "/",
    },
  ],
  bottom: [
    {
      text: "For Business",
      slug: "/",
    },
    {
      text: "For Persons",
      slug: "/",
    },
  ],
};

export const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const { scrollStop, scrollResume } = useContext(ScrollContext);

  const handleMenuClick = () => {
    if(isActive) {
      scrollResume();
    } else {
      scrollStop();
    }
    setIsActive(!isActive);
  }

  return (
    <div data-not-desktop>
      <div
        className={clsx(s.button, {
          [s.button_active]: isActive,
        })}
        onClick={handleMenuClick}
      >
        <span className={s.line} />
        <span className={s.line} />
      </div>
      <AnimatePresence mode="wait">
        {isActive && (
          <>
            <motion.div className={s.menuBg} {...anim(MenuAnim.bg)} />
            <motion.div className={s.menu} {...anim(MenuAnim.menuBody)}>
              <ul className={s.menu_links}>
                {linksList.top.map((currI, i) => (
                  <motion.li key={i} {...anim(MenuAnim.links)} custom={i}>
                    <Link href={currI.slug}>
                      <h1 className="second-mobile">{currI.text}</h1>
                    </Link>
                  </motion.li>
                ))}
                <motion.div
                  {...anim(MenuAnim.links)}
                  custom={linksList.top.length}
                  className={s.buttonWrapper}
                >
                  <ButtonMain link="/" text="Get in Touch" />
                </motion.div>
              </ul>
              <div className={s.bottom}>
                <motion.h2
                  {...anim(MenuAnim.links)}
                  custom={linksList.top.length + 0.5}
                  className={`shadow ${s.bottomTitle}`}
                >
                  Pricing
                </motion.h2>
                {linksList.bottom.map((currL, i) => (
                  <Link key={i} href={currL.slug}>
                    <motion.h2
                      {...anim(MenuAnim.links)}
                      custom={linksList.top.length + i}
                    >
                      {currL.text}
                    </motion.h2>
                  </Link>
                ))}
              </div>
              <motion.span
                {...anim(MenuAnim.links)}
                custom={linksList.top.length}
                className={s.line}
              />
              <motion.div
                {...anim(MenuAnim.links)}
                custom={linksList.top.length + linksList.bottom.length}
                className={s.logInButtons}
              >
                <Link href="/" className={`${s.button} ${s.transparentButton}`}>
                  Sign in
                </Link>
                <Link href="/" className={`${s.button} ${s.blackButton}`}>
                  Log in
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

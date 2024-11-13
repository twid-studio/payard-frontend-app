import React, { useState, useEffect } from "react";
import s from "./CookiePopUp.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { anim, CookieAnim } from "@/lib/helpers/anim";

export const CookiePopUp = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the user has made a choice
    const userChoice = localStorage.getItem("cookieChoice");
    if (userChoice === null) {
      // If no choice has been made, show the pop-up
      setShowPopup(true);
    }
  }, []);

  const handleClick = (choise) => {
    localStorage.setItem("cookieChoice", choise);
    setShowPopup(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showPopup && (
        <motion.div {...anim(CookieAnim)} className={s.cookie}>
          <div className={s.text}>
            <h3 className="bold">We Care About Your Privacy</h3>
            <p>
              We use the necessary cookies to make our site work. You may
              disable these by changing your browser settings, which may affect
              how the website functions. We&apos;d also like to set analytics cookies
              that help us improve by measuring how you use the site. These will
              be set only if you accept.
            </p>
          </div>
          <div className={s.button_wrapper}>
            <p className={`${s.button} ${s.mainButton}`} onClick={() => handleClick("accepted")}>
              <span className={s.bg} />
              Accept
            </p>
            <p
              className={`${s.button} ${s.transparentButton}`}
              onClick={() => handleClick("declined")}
            >
              <span className={s.bg} />
              Decline
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

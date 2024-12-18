import { ButtonBlack, ButtonMain, ButtonTransparent } from "@/utils/Button/Button";
import React from "react";

import s from "./ButtonsSection.module.scss";

export default function ButtonsSection({ data }) {
  const { getInTouchButton, pricingButtons } = data;

  return (
    <section className={s.buttonSection}>
      <div className={s.getInTouch}>
        <p className={s.text}>{getInTouchButton.title}</p>
        <ButtonTransparent
          link={getInTouchButton.buttonSetting.buttonLink}
          text={getInTouchButton.buttonSetting.buttonText}
          addClass={s.button}
        />
      </div>
      <div className={s.pricing}>
        <p className={s.title}>{pricingButtons.title}</p>
        <div className={s.pricing_buttons}>
          <ButtonBlack
            text={pricingButtons.businessButtonSetting.buttonText}
            link={pricingButtons.businessButtonSetting.buttonLink}
            addClass={s.button}
          />
          <ButtonMain
            text={pricingButtons.personButtonSetting.buttonText}
            link={pricingButtons.personButtonSetting.buttonLink}
            addClass={s.button}
          />
        </div>
      </div>
    </section>
  );
}

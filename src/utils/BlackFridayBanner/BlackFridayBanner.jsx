import React, { useState } from "react";

import s from "./BlackFridayBanner.module.scss";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export const BlackFridayBanner = () => {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <div className={s.bannerWrapper}>
      {/* <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(s.crossMobile, {
          [s.crossMobile_hidden]: !showBanner,
        })}
        onClick={() => setShowBanner(false)}
      >
        <rect width="36" height="36" rx="18" fill="black" />
        <rect
          x="23.25"
          y="12"
          width="1.06066"
          height="15.9099"
          transform="rotate(45 23.25 12)"
          fill="white"
        />
        <rect
          x="12"
          y="12.75"
          width="1.06066"
          height="15.9099"
          transform="rotate(-45 12 12.75)"
          fill="white"
        />
      </svg> */}

      <div
        className={clsx(s.banner, {
          [s.banner_hidden]: !showBanner,
        })}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.cross}
          onClick={() => setShowBanner(false)}
        >
          <rect width="36" height="36" rx="18" fill="black" />
          <rect
            x="23.25"
            y="12"
            width="1.06066"
            height="15.9099"
            transform="rotate(45 23.25 12)"
            fill="white"
          />
          <rect
            x="12"
            y="12.75"
            width="1.06066"
            height="15.9099"
            transform="rotate(-45 12 12.75)"
            fill="white"
          />
        </svg>

        <Image
          src="/images/_black-friday/Frame.webp"
          alt="Black Friday Banner"
          width={450}
          height={410}
          priority
          className={s.image}
        />
        <div className={s.content}>
          <h2 className={s.title}>Black Friday Sale!</h2>
          <Link
            href="https://client.payard.io/sign-up"
            target="_blank"
            className={s.link}
          >
            <span>Sign up</span>
          </Link>
        </div>
        <div className={s.bg}></div>
      </div>
    </div>
  );
};

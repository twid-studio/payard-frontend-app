import React, { useRef, useState, useEffect } from "react";
import s from "./FaqItem.module.scss";
import SanityBlockContent from "@sanity/block-content-to-react";
import clsx from "clsx";

export const FaqItem = ({ title, body, activeItem, setActiveItem, index }) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const handleOnClick = () => {
    if (activeItem !== index) {
      setActiveItem(index)
    } else {
      setActiveItem(null)
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      // Convert pixel height to vw
      const pixelHeight = contentRef.current.scrollHeight;
      const vwHeight = (pixelHeight / window.innerWidth) * 100;
      setHeight(activeItem === index ? vwHeight : 0);
    }
  }, [activeItem, index]);

  return (
    <div className={clsx(s.faqItem, {
      [s.faqItem__active]: activeItem === index
    })}>
      <div className={s.head} onClick={handleOnClick}>
        <h2 className="second-mobile">{title}</h2>
        <div className={s.head_line_wrapper}>
          <span className={s.head_line} />
          <span className={s.head_line} />
        </div>
      </div>
      <div 
        className={s.body} 
        style={{
          height: `${height}vw`,
        }}
      >
        <div ref={contentRef} className={s.body_content}>
          <SanityBlockContent
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            blocks={body}
            className={s.body_element}
          />
        </div>
      </div>
    </div>
  );
};
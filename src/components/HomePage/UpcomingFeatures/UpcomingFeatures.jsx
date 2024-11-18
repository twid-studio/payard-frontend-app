import React, { useContext } from "react";
import s from "./UpcomingFeatures.module.scss";
import Image from "next/image";
import { DataContext } from "@/lib/providers/DataProvider/context";


export default function UpcomingFeatures() {
  const { data } = useContext(DataContext);

  return (
    <section className={s.features}>
      <div className={s.content}>
        <div className={s.top}>
          <Image
            className={s.image}
            width={243}
            height={243}
            src="/images/features/Payard-Origami-Loader-25fps-243.gif"
            alt=""
            unoptimized
          />
          <h1 className={"super-text second-tablet"}>Upcoming Features</h1>
        </div>

        <ul className={s.list}>
          {data.features.map((currI, i) => (
            <li className={s.item} key={i}>
              <div className={s.left}>
                <Image
                  width={50}
                  height={50}
                  src={currI?.icon}
                  alt="icon"
                />
                <span>{currI?.title}</span>
              </div>
              <p className={"shadow " + s?.text}>{currI.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

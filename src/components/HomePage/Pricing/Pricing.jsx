import React, { useContext } from "react";
import s from "./Pricing.module.scss";
import { ButtonMain } from "@/utils/Button/Button";
import { Paragraph } from "@/utils/ParagraphAnim/ParagraphAnim";
import { DataContext } from "@/lib/providers/DataProvider/context";

const cardsContent = [
  {
    cardColor: "black",
    type: "Business account",
    table: [
      {
        fisrtTitle: "One time fees",
        secondTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Open Account",
            second: "500",
          },
          {
            first: "Open Account (high risk business) ",
            second: "1500",
          },
        ],
      },
      {
        fisrtTitle: "Recurring fees",
        secondTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Monthly fee",
            second: "100",
          },
        ],
      },
    ],
    transfersTable: [
      {
        fisrtTitle: "One time fees",
        secondTitle: "Fee %",
        thirdTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Outgoing transfer",
            second: "0,3",
            secondUnder: "(min 15€)",
            third: "15",
            thirdUnder: "(min 15€)",
          },
          {
            first: "Incoming transfer",
            second: false,
            third: false,
          },
        ],
      },
    ],
  },
  {
    cardColor: "white",
    type: "Personal Account",
    table: [
      {
        fisrtTitle: "One time fees",
        secondTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Open Account",
            second: "Free",
          },
        ],
      },
      {
        fisrtTitle: "Recurring fees",
        secondTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Monthly fee",
            second: "25",
          },
        ],
      },
    ],
    transfersTable: [
      {
        fisrtTitle: "One time fees",
        secondTitle: "Fee %",
        thirdTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Outgoing transfer",
            second: "0,3",
            secondUnder: "(min 15€)",
            third: "15",
            thirdUnder: "(min 15€)",
          },
          {
            first: "Incoming transfer",
            second: false,
            third: false,
          },
        ],
      },
    ],
  },
];

export default function PricingHome() {
  const { data: allData } = useContext(DataContext);

  const data = allData.pricingPreview;

  return (
    <section className={s.pricing}>
      <div className={s.title}>
        <h1 className="super-text second-tablet second-mobile">
          <Paragraph paragraph={[data.title.base]} classNames={s.title_anim} />
          <span className="edgy green">
            <Paragraph
              paragraph={[data.title.edgy]}
              classNames={s.title_anim}
            />
          </span>
        </h1>
        <p className={s.text}>{data.text}</p>
      </div>
      <div className={s.cards_wrapper}>
        {data.cards.map((currCard, i) => (
          <Card card={currCard} key={i} />
        ))}
      </div>
    </section>
  );
}

const Card = ({ card }) => {
  const { settings, table, tableBottom, buttonGroup } = card;
  const classForWrapper = `${s.card} ${
    settings.cardColor === "black" ? s.card_black : ""
  }`;

  return (
    <div className={classForWrapper}>
      <div className={s.main}>
        <p className={s.tag}>{settings.type}</p>
        <Table table={table} />
      </div>
      <div className={s.transfers}>
        <Table table={tableBottom} />
      </div>
      <div className={s.button}>
        <ButtonMain
          link={buttonGroup?.buttonLink || "/"}
          text={buttonGroup?.buttonText || "Learn More"}
        />
      </div>
    </div>
  );
};

const Table = ({ table }) => (
  <div className={s.table}>
    {table.map((currT, i) => (
      <div className={s.table_content} key={i}>
        {currT.title && <h2>{currT.title}</h2>}
        <ul className={`${s.tableWrapper} ${s.tableTop}`}>
          {currT.tableHeaders.map((currTableTop, indexTop) => (
            <li
              className={`${s.tableItem} shadow small-text second-mobile`}
              key={indexTop}
            >
              {currTableTop}
            </li>
          ))}
          <span className={s.line} />
        </ul>
        {currT.tableRows.map((currTableRow, j) => (
          <ul className={s.tableWrapper} key={i + j}>
            <li className={s.tableItem}>{currTableRow.name}</li>
            <li className={s.tableItem}>
              {currTableRow.secondValues.second ? (
                <>
                  {currTableRow.secondValues?.second === "Free" ? (
                    <h2 className={s.highlight}>Free</h2>
                  ) : (
                    <>
                      <h3>{currTableRow.secondValues.second}</h3>
                      <p>{currTableRow.secondValues.underTextSecond}</p>
                    </>
                  )}
                </>
              ) : (
                <h3 className="shadow">━</h3>
              )}
            </li>
            {currTableRow.thirdValues && (
              <li className={s.tableItem}>
                {currTableRow.thirdValues?.second ? (
                  <>
                    {currTableRow.thirdValues?.second === "Free" ? (
                      <h2 className={s.highlight}>Free</h2>
                    ) : (
                      <>
                        <h3>{currTableRow.thirdValues.second}</h3>
                        <p>{currTableRow.thirdValues.underTextSecond}</p>
                      </>
                    )}
                  </>
                ) : (
                  <h3 className="shadow">━</h3>
                )}
              </li>
            )}
            <span className={s.line} />
          </ul>
        ))}
      </div>
    ))}
  </div>
);

import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext, useRef } from "react";

import s from "./Table.module.scss";
import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { anim, HeroCardPresence } from "@/lib/helpers/anim";
import Image from "next/image";

export default function TablePricing({ setIsFixedList, blackTheme }) {
  const { data: allData } = useContext(DataContext);
  const data = allData.pricingTables;

  const tableRef = useRef();

  const { scrollYProgress } = useScroll({
    target: tableRef,
    offset: ["0% 0%", "100% 70%"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsFixedList(latest > 0 && latest !== 1);
  });

  return (
    data && (
      <motion.section
        {...anim(HeroCardPresence)}
        className={clsx(s.table, {
          [s.table_black]: blackTheme,
        })}
        ref={tableRef}
      >
        {data.map((currentTable, wrapperIndex) => (
          <div key={wrapperIndex} id={currentTable.tableSlug}>
            <h2 className={"shadow " + s.shadow}>{currentTable.tableTitle}</h2>
            {currentTable.list.map((tableItem, tableIndex) => (
              <div
                className={s.table_content}
                key={`${currentTable.tableTitle}_${tableIndex}`}
              >
                <div
                  className={clsx(`${s.tableGrid} ${s.table_header}`, {
                    [s.tableGrid_twoColumn]:
                      tableItem.tableHeaders.length === 2,
                  })}
                >
                  {/* header */}
                  {tableItem.tableHeaders.map((currentHeader, headerIndex) => (
                    <p
                      className={`${s.table_item} ${s.shadow} small-text second-mobile shadow`}
                      key={`${currentTable.tableTitle}_${tableIndex}_${headerIndex}`}
                    >
                      {currentHeader.match("Fixed Fee") ? (
                        <>
                          Fixed Fee
                          <br />
                          {currentHeader.split("Fixed Fee")[1]}
                        </>
                      ) : (
                        currentHeader
                      )}
                      {headerIndex === 0 && tableItem.headerIcon && (
                        <Image
                          src={tableItem.headerIcon}
                          className={s.table_item_image}
                          width={24}
                          height={24}
                        />
                      )}
                    </p>
                  ))}
                </div>
                <div>
                  {/* rows */}
                  {tableItem.tableRows.map((tableRow, rowIndex) => (
                    <div
                      key={`${currentTable.tableTitle}_${tableIndex}_row_${rowIndex}`}
                      className={clsx(`${s.tableGrid} ${s.table_main_grid}`, {
                        [s.tableGrid_twoColumn]:
                          tableItem.tableHeaders.length === 2,
                      })}
                    >
                      <p className={`${s.table_item}`}>
                        {tableRow.values.name}
                      </p>

                      {/* Second values */}
                      {tableRow.values.secondValues && (
                        <div className={`${s.table_item}`}>
                          {!tableRow.values.secondValues.switchField ? (
                            <h2>{tableRow.values.secondValues.second}</h2>
                          ) : (
                            <h2 className={"shadow " + s.shadow}>━</h2>
                          )}
                          {tableRow.values.secondValues.underTextSecond && !tableRow.values.secondValues.switchField && (
                            <p>
                              {tableRow.values.secondValues.underTextSecond}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Third values */}
                      {tableRow.values.thirdValues && (
                        <div className={`${s.table_item}`}>
                          {!tableRow.values.thirdValues.switchField ? (
                            <h2>{tableRow.values.thirdValues.second}</h2>
                          ) : (
                            <h2 className={"shadow " + s.shadow}>━</h2>
                          )}
                          {tableRow.values.thirdValues.underTextSecond && (
                            <p>{tableRow.values.thirdValues.underTextSecond}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {currentTable.underTables && (
              <div className={s.underTables}>
                {currentTable.underTables.map((currText, index) => (
                  <p className="shadow" key={index}>
                    {currText}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.section>
    )
  );
}

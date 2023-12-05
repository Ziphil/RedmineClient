//

import {css} from "@linaria/core";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";


const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  hairia: css`
    font-size: 12px;
  `,
  date: css`
    font-size: 12px;
  `,
  month: css`
    font-size: 10px;
  `,
  day: css`
    font-size: 10px;
  `
};

export const DateView = function ({
  date
}: {
  date: Dayjs
}): ReactElement {

  return (
    <div className={styles.root}>
      <div className={styles.hairia}>
        {getHairia(date)}
      </div>
      <div className={styles.date}>
        <span className={styles.month}>{date.format("MM")}</span>
        <span className={styles.month}>/</span>
        <span>{date.format("DD")}</span>
      </div>
      <div className={styles.day}>
        {date.format("ddd")}
      </div>
    </div>
  );

};


function getHairia(date: Dayjs): number {
  return date.diff(dayjs("2012-01-22"), "day");
}
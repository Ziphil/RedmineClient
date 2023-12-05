//

import {css} from "@linaria/core";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {data} from "/renderer/util/data";
import {borderColor, gradientBackground} from "/renderer/util/css";


const styles = {
  root: css`
    border-block-end: solid 1px ${borderColor()};
    grid-template-columns: 30% repeat(25, 1fr);
    display: grid;
  `,
  item: css`
    padding-block: 4px;
    row-gap: 2px;
    border-start-start-radius: 4px;
    border-start-end-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &[data-today] {
      font-weight: bold;
      ${gradientBackground(0.92)}
    }
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

export const IssueChartHeader = function ({
  businessDays
}: {
  businessDays: Array<Dayjs>
}): ReactElement {

  return (
    <div className={styles.root}>
      {businessDays.map((day, index) => (
        <div
          className={styles.item}
          key={day.format("YYYY-MM-DD")}
          style={{gridColumnStart: index + 2, gridColumnEnd: index + 3}}
          {...data({today: day.isSame(dayjs(), "day")})}
        >
          <div className={styles.hairia}>
            {getHairia(day)}
          </div>
          <div className={styles.date}>
            <span className={styles.month}>{day.format("MM")}</span>
            <span className={styles.month}>/</span>
            <span>{day.format("DD")}</span>
          </div>
          <div className={styles.day}>
            {day.format("ddd")}
          </div>
        </div>
      ))}
    </div>
  );

};


function getHairia(day: Dayjs): number {
  return day.diff(dayjs("2012-01-22"), "day");
}
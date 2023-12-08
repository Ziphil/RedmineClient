//

import {css} from "@linaria/core";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {DateView} from "/renderer/component/module/date-view";
import {borderColor, gradientBackground} from "/renderer/util/css";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
    border-block-end: solid 1px ${borderColor()};
    grid-template-columns: 30% repeat(25, 1fr);
    display: grid;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  item: css`
    margin-inline-end: -1px;
    padding-block: 4px;
    font-size: 12px;
    border-start-start-radius: 4px;
    border-start-end-radius: 4px;
    &[data-today] {
      font-weight: bold;
      ${gradientBackground(0.92)}
    }
  `
};

export const IssueChartHeader = create(
  require("./issue-chart-header.scss"), "IssueChartHeader",
  function ({
    businessDates
  }: {
    businessDates: Array<Dayjs>
  }): ReactElement {

    return (
      <div styleName="root" style={{gridTemplateColumns: `1fr repeat(${businessDates.length}, 36px)`}}>
        {businessDates.map((date, index) => (
          <div
            styleName="item"
            key={date.format("YYYY-MM-DD")}
            style={{gridColumnStart: index + 2, gridColumnEnd: index + 3}}
            {...data({today: date.isSame(dayjs(), "day")})}
          >
            <DateView date={date}/>
          </div>
        ))}
      </div>
    );

  }
);
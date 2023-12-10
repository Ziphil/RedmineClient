//

import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";


export const DateView = create(
  require("./date-view.scss"), "DateView",
  function ({
    date,
    orientation = "vertical"
  }: {
    date: Dayjs,
    orientation?: "vertical" | "horizontal"
  }): ReactElement {

    return (
      <div styleName="root" {...data({orientation})}>
        <div styleName="hairia">
          {getHairia(date)}
        </div>
        <div styleName="dot" {...data({orientation})}>·</div>
        <div styleName="date">
          <span styleName="month">{date.format("MM")}</span>
          <span styleName="slash">/</span>
          <span>{date.format("DD")}</span>
        </div>
        <div styleName="day">
          <span styleName="paren" {...data({orientation})}>(</span>
          {date.format("dd")}
          <span styleName="paren" {...data({orientation})}>)</span>
        </div>
      </div>
    );

  }
);


function getHairia(date: Dayjs): number {
  return date.diff(dayjs("2012-01-22"), "day");
}
//

import dayjs, {Dayjs} from "dayjs";
import {ReactElement, useEffect, useState} from "react";
import {create} from "/renderer/component/create";


export const Clock = create(
  require("./clock.scss"), "Clock",
  function ({
    time = "now"
  }: {
    time?: Dayjs | "now"
  }): ReactElement {

    const [now, setNow] = useState(dayjs());
    const displayedTime = (time === "now") ? now : time;

    const hourString = displayedTime.format("HH");
    const minuteString = displayedTime.format("mm");

    useEffect(() => {
      if (time === "now") {
        const interval = setInterval(() => {
          setNow(dayjs());
        }, 100);
        return () => clearInterval(interval);
      } else {
        return undefined;
      }
    }, [time]);

    return (
      <span styleName="root">
        {[...hourString].map((digit, index) => (
          <span key={index} styleName="digit">{digit}</span>
        ))}
        <span styleName="colon">:</span>
        {[...minuteString].map((digit, index) => (
          <span key={index} styleName="digit">{digit}</span>
        ))}
      </span>
    );

  }
);
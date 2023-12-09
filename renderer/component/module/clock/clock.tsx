//

import dayjs from "dayjs";
import {ReactElement, useEffect, useState} from "react";
import {create} from "/renderer/component/create";


export const Clock = create(
  require("./clock.scss"), "Clock",
  function ({
  }: {
  }): ReactElement {

    const [nowDate, setNowDate] = useState(dayjs());

    const hourString = nowDate.format("HH");
    const minuteString = nowDate.format("mm");

    useEffect(() => {
      const interval = setInterval(() => {
        setNowDate(dayjs());
      }, 100);
      return () => clearInterval(interval);
    }, []);

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
//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useEffect, useState} from "react";


const styles = {
  root: css`
  `,
  digit: css`
    width: 0.62em;
    display: inline-block;
    text-align: center;
  `,
  colon: css`
    margin-inline: 0.1em;
  `
};

export const Clock = function ({
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
    <span className={styles.root}>
      {[...hourString].map((digit, index) => (
        <span key={index} className={styles.digit}>{digit}</span>
      ))}
      <span className={styles.colon}>:</span>
      {[...minuteString].map((digit, index) => (
        <span key={index} className={styles.digit}>{digit}</span>
      ))}
    </span>
  );

};
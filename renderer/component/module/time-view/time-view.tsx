//

import {css} from "@linaria/core";
import {ReactElement} from "react";


const styles = {
  root: css`
  `,
  digit: css`
    width: 0.64em;
    display: inline-block;
    text-align: center;
  `,
  colon: css`
    margin-inline: 0.1em;
    inset-block-end: 0.08em;
    position: relative;
  `
};

export const TimeView = function ({
  time
}: {
  time: number
}): ReactElement {

  const hour = Math.floor(time / 1000 / 60 / 60);
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;
  const hourString = hour.toString();
  const minuteString = (hour === 0) ? minute.toString() : minute.toString().padStart(2, "0");
  const secondString = (hour === 0 && minute === 0) ? second.toString() : second.toString().padStart(2, "0");

  return (
    <span className={styles.root}>
      {(hour > 0) && (
        <>
          {[...hourString].map((digit, index) => (
            <span key={index} className={styles.digit}>{digit}</span>
          ))}
          <span className={styles.colon}>:</span>
        </>
      )}
      {(hour > 0 || minute > 0) && (
        <>
          {[...minuteString].map((digit, index) => (
            <span key={index} className={styles.digit}>{digit}</span>
          ))}
          <span className={styles.colon}>:</span>
        </>
      )}
      {[...secondString].map((digit, index) => (
        <span key={index} className={styles.digit}>{digit}</span>
      ))}
    </span>
  );

};
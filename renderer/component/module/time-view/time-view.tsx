//

import {css} from "@linaria/core";
import {ReactElement} from "react";


const styles = {
  root: css`
  `,
  digit: css`
    width: 0.63em;
    display: inline-block;
    text-align: center;
  `,
  colon: css`
    margin-inline: 0.1em;
  `,
  small: css`
    font-size: 80%;
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
  const secondString = second.toString().padStart(2, "0");

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
      {[...minuteString].map((digit, index) => (
        <span key={index} className={styles.digit}>{digit}</span>
      ))}
      <span className={styles.small}>
        <span className={styles.colon}>:</span>
        {[...secondString].map((digit, index) => (
          <span key={index} className={styles.digit}>{digit}</span>
        ))}
      </span>
    </span>
  );

};
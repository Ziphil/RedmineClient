//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {Clock} from "/renderer/component/module/clock";
import {DateView} from "/renderer/component/module/date-view";
import {gradientBackground, textColor} from "/renderer/util/css";


const styles = {
  root: css`
    height: 32px;
    padding-inline: 24px;
    color: ${textColor("dark")};
    ${gradientBackground(0.3)}
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  left: css`
  `,
  right: css`
  `
};

export const Header = function ({
}: {
}): ReactElement {

  return (
    <header className={styles.root}>
      <div className={styles.left}>
        <DateView date={dayjs()} orientation="horizontal"/>
      </div>
      <div className={styles.right}>
        <Clock/>
      </div>
    </header>
  );

};

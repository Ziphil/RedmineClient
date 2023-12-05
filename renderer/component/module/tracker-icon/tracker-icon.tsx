//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {Tracker} from "/renderer/type";
import {iconFont} from "/renderer/util/css";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
    width: 1em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &::before {
      ${iconFont()}
    }
    &[data-tracker="feature"]::before {
      content: "\uF004";
    }
    &[data-tracker="bug"]::before {
      content: "\uF188";
    }
    &[data-tracker="refactor"]::before {
      content: "\uF005";
    }
    &[data-tracker="other"]::before {
      content: "\uF068";
    }
  `
};

export const TrackerIcon = function ({
  tracker
}: {
  tracker: Tracker
}): ReactElement {

  return (
    <span className={styles.root} {...data({tracker})}/>
  );

};
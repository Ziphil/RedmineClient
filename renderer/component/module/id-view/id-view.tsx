//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {gradientBackground} from "/renderer/util/css";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
    width: 3em;
    padding-block: 0.2em;
    font-size: 70%;
    letter-spacing: -0.05em;
    border-radius: 1em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-grow: 0;
    flex-shrink: 0;
    &[data-environment="light"] {
      ${gradientBackground(0.9)}
    }
    &[data-environment="dark"] {
      ${gradientBackground(0.65)}
    }
  `
};

export const IdView = function ({
  id,
  environment = "light"
}: {
  id: number,
  environment?: "light" | "dark"
}): ReactElement {

  return (
    <span className={styles.root} {...data({environment})}>
      {id}
    </span>
  );

};

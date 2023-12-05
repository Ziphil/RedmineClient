//

import {css} from "@linaria/core";
import {MouseEvent, ReactElement} from "react";
import {gradientBackground, gradientText, iconFont} from "/renderer/util/css";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
    ${gradientBackground(0.98)};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    &[data-size="medium"] {
      width: 48px;
      height: 48px;
      font-size: 24px;
      border-radius: 48px;
      box-shadow: 0px 2px 6px hsla(0, 0%, 100%, 0.3);
    }
    &[data-size="large"] {
      width: 80px;
      height: 80px;
      font-size: 40px;
      border-radius: 80px;
      box-shadow: 0px 4px 12px hsla(0, 0%, 100%, 0.3);
    }
    &::before {
      inset: 0px;
      ${gradientBackground(0.9)}
      transition: opacity 0.2s ease;
      opacity: 0;
      z-index: 1;
      content: "";
      position: absolute;
    }
    &:hover::before {
      opacity: 1;
    }
  `,
  icon: css`
    ${gradientText(0.5)}
    z-index: 2;
    &::before {
      ${iconFont()}
      content: attr(data-icon);
    }
  `
};

export const IconButton = function ({
  icon,
  size,
  onClick
}: {
  icon: string,
  size: "medium" | "large",
  onClick?: (event: MouseEvent<HTMLButtonElement>) => unknown
}): ReactElement {

  return (
    <button className={styles.root} type="button" onClick={onClick} {...data({size})}>
      <span className={styles.icon} {...data({icon})}/>
    </button>
  );

};
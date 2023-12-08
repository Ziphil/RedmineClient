//

import {IconDefinition} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {css} from "@linaria/core";
import {MouseEvent, ReactElement} from "react";
import {create} from "/renderer/component/create";
import {gradientBackground} from "/renderer/util/css";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
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
    &[data-environment="light"] {
      ${gradientBackground(0.5)}
    }
    &[data-environment="dark"] {
      ${gradientBackground(0.98)}
    }
    &[data-environment="light"]::before {
      ${gradientBackground(0.6)}
    }
    &[data-environment="dark"]::before {
      ${gradientBackground(0.9)}
    }
    &::before {
      inset: 0px;
      transition: opacity 0.3s ease;
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
    z-index: 2;
    &[data-environment="light"] {
      ${gradientBackground(0.98)}
    }
    &[data-environment="dark"] {
      ${gradientBackground(0.5)}
    }
  `
};

export const IconButton = create(
  require("./icon-button.scss"), "IconButton",
  function ({
    icon,
    size,
    color,
    onClick
  }: {
    icon: IconDefinition,
    size: "medium" | "large",
    color: "purple" | "blue" | "pink",
    onClick?: (event: MouseEvent<HTMLButtonElement>) => unknown
  }): ReactElement {

    return (
      <button styleName="root" type="button" onClick={onClick} {...data({size, color})}>
        <FontAwesomeIcon styleName="icon" icon={icon} {...data({color})}/>
      </button>
    );

  }
);
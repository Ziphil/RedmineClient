//

import {IconDefinition} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MouseEvent, ReactElement} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";


export const IconButton = create(
  require("./icon-button.scss"), "IconButton",
  function ({
    icon,
    size,
    color,
    environment = "light",
    onClick
  }: {
    icon: IconDefinition,
    size: "medium" | "large",
    color: "purple" | "blue" | "pink",
    environment?: "light" | "background",
    onClick?: (event: MouseEvent<HTMLButtonElement>) => unknown
  }): ReactElement {

    return (
      <button styleName="root" type="button" onClick={onClick} {...data({size, color, environment})}>
        <FontAwesomeIcon styleName="icon" icon={icon} {...data({color, environment})}/>
      </button>
    );

  }
);
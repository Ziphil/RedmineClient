//

import {IconDefinition, faBan, faCheck, faMinus, faRunning, faSparkles} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Status} from "/renderer/type";


export const StatusView = create(
  require("./status-view.scss"), "StatusView",
  function ({
    status
  }: {
    status: Status
  }): ReactElement {

    const [icon, label] = getStatusSpec(status);

    return (
      <span styleName="root">
        <FontAwesomeIcon styleName="icon" icon={icon}/>
        <span styleName="label">{label}</span>
      </span>
    );

  }
);


export function getStatusSpec(status: Status): [IconDefinition, string] {
  if (status === "new") {
    return [faSparkles, "新規"];
  } else if (status === "progress") {
    return [faRunning, "進行中"];
  } else if (status === "closed") {
    return [faCheck, "完了"];
  } else if (status === "rejected") {
    return [faBan, "却下"];
  } else {
    return [faMinus, "その他"];
  }
}
//

import {IconDefinition, faBan, faCheck, faMinus, faRunning, faSparkles} from "@fortawesome/pro-solid-svg-icons";
import {css} from "@linaria/core";
import {ReactElement} from "react";
import {Icon} from "/renderer/component/atom/icon";
import {Status} from "/renderer/type";
import {gradientBackground, gradientText} from "/renderer/util/css";


const styles = {
  root: css`
    display: inline-flex;
    font-size: 80%;
  `,
  icon: css`
    margin-inline-end: 4px;
    ${gradientBackground(0.7)}
  `,
  label: css`
    ${gradientText(0.7)}
  `
};

export const StatusView = function ({
  status
}: {
  status: Status
}): ReactElement {

  const [icon, label] = getStatusSpec(status);

  return (
    <span className={styles.root}>
      <Icon className={styles.icon} icon={icon}/>
      <span className={styles.label}>{label}</span>
    </span>
  );

};


function getStatusSpec(status: Status): [IconDefinition, string] {
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
//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {Issue} from "/renderer/type";
import {gradientBackground} from "/renderer/util/css";
import {IssuePlayerIssueView} from "./issue-player-issue-view";


const styles = {
  root: css`
    padding-block: 32px;
    padding-inline: 32px;
    border-end-start-radius: 16px;
    border-end-end-radius: 16px;
    color: white;
    ${gradientBackground(0.5)}
  `
};

export const IssuePlayer = function ({
  issue
}: {
  issue: Issue | null
}): ReactElement {

  return (
    <div className={styles.root}>
      <IssuePlayerIssueView issue={issue}/>
    </div>
  );

};
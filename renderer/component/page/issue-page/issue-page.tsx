//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {Link, LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {IssueView} from "/renderer/component/module/issue-view";
import {Issue} from "/renderer/type";


const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  main: css`
    margin-block-start: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
  `
};

export const IssuePage = function ({
}: {
}): ReactElement {

  const {issue} = useLoaderData() as IssuePageLoaderData;

  return (
    <div className={styles.root}>
      <Link to="/chart">BACK</Link>
      <div className={styles.main}>
        <IssueView issue={issue}/>
      </div>
    </div>
  );

};


type IssuePageLoaderData = {
  id: number,
  issue: Issue
};

export async function loadIssuePage(args: LoaderFunctionArgs): Promise<IssuePageLoaderData> {
  const id = +(args.params.id ?? "0");
  const issue = await window.api.fetchIssue({id});
  return {id, issue};
}


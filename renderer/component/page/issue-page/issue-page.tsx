//

import {faArrowUpRightFromSquare, faLeft} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {css} from "@linaria/core";
import {ReactElement, useCallback} from "react";
import {Link, LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {IssueView} from "/renderer/component/module/issue-view";
import {Issue} from "/renderer/type";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  navigation: css`
    display: flex;
    justify-content: space-between;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  main: css`
    margin-block-start: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  link: css`
    color: hsl(220, 65%, 50%);
    border-block-end: 1px solid currentcolor;
    cursor: pointer;
    &[data-simple] {
      border: none;
    }
  `,
  icon: css`
    margin-inline-end: 4px;
  `
};

export const IssuePage = function ({
}: {
}): ReactElement {

  const {issue} = useLoaderData() as IssuePageLoaderData;

  const openExternal = useCallback(function (): void {
    window.api.send("open-external", `${process.env["REDMINE_URL"]}/issues/${issue.id}`);
  }, [issue.id]);

  return (
    <div className={styles.root}>
      <nav className={styles.navigation}>
        <Link className={styles.link} to="/chart">
          <FontAwesomeIcon className={styles.icon} icon={faLeft}/>
          BACK
        </Link>
        <button className={styles.link} type="button" onClick={openExternal} {...data({simple: true})}>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
        </button>
      </nav>
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


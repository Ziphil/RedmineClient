//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useCallback} from "react";
import {Link, LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {Markdown} from "/renderer/component/atom/markdown";
import {useWork} from "/renderer/hook/work";
import {HierarchicalIssue} from "/renderer/type";


const styles = {
  root: css`
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
  const [work, setWork] = useWork();

  const handleClick = useCallback(function (): void {
    if (work === null) {
      const work = {issue, startDate: dayjs(), additionalTime: 0};
      setWork(work);
    }
  }, [work, setWork, issue]);

  return (
    <div className={styles.root}>
      <Link to="/chart">BACK</Link>
      <div>{issue.subject}</div>
      <div>
        <Markdown>{issue.description}</Markdown>
      </div>
      <button onClick={handleClick}>GO</button>
    </div>
  );

};


type IssuePageLoaderData = {
  id: number,
  issue: HierarchicalIssue
};

export async function loadIssuePage(args: LoaderFunctionArgs): Promise<IssuePageLoaderData> {
  const id = +(args.params.id ?? "0");
  const issue = await window.api.fetchIssue({id}) as any;
  return {id, issue};
}


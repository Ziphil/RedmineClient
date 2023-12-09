//

import {faArrowUpRightFromSquare, faLeft} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactElement, useCallback} from "react";
import {LoaderFunctionArgs, useParams} from "react-router-dom";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {IssueView} from "/renderer/component/module/issue-view";
import {PageContainer} from "/renderer/component/module/page-container";
import {useSuspenseQuery} from "/renderer/hook/request";
import {Id} from "/renderer/type/common";
import {data} from "/renderer/util/data";


export const IssuePage = create(
  require("./issue-page.scss"), "IssuePage",
  function ({
  }: {
  }): ReactElement {

    const {idString} = useParams();
    const id = +(idString ?? "1") as Id;
    const [issue] = useSuspenseQuery("fetchIssue", window.api.fetchIssue, {id});

    const openExternal = useCallback(function (): void {
      window.api.send("open-external", `${process.env["REDMINE_URL"]}/issues/${issue.id}`);
    }, [issue.id]);

    return (
      <PageContainer
        menuNode={(
          <nav styleName="navigation">
            <TransitionLink styleName="back" to="/chart">
              <FontAwesomeIcon styleName="icon" icon={faLeft}/>
              BACK
            </TransitionLink>
            <button styleName="external" type="button" onClick={openExternal} {...data({simple: true})}>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
            </button>
          </nav>
        )}
      >
        <div styleName="main">
          <IssueView issue={issue}/>
        </div>
      </PageContainer>
    );

  }
);


export async function loadIssuePage(args: LoaderFunctionArgs): Promise<{}> {
  return {};
}
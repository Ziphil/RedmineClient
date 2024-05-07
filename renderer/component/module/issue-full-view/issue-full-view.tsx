//

import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {Markdown} from "/renderer/component/atom/markdown";
import {create} from "/renderer/component/create";
import {IssueSubjectView} from "/renderer/component/module/issue-subject-view";
import {Issue, IssueWithDetails} from "/renderer/type";
import {ChildIssuesPane} from "./child-issues-pane";
import {IssueController} from "./issue-controller";
import {IssueInfoPane} from "./issue-info-pane";
import {NoteList} from "./note-list";


export const IssueFullView = create(
  require("./issue-full-view.scss"), "IssueFullView",
  function ({
    issue,
    ancestorIssues
  }: {
    issue: IssueWithDetails,
    ancestorIssues: Array<Issue>
  }): ReactElement {

    return (
      <div styleName="root">
        <div styleName="top">
          <div styleName="subject">
            <IssueSubjectView issue={issue} ancestorIssues={ancestorIssues} size="medium"/>
            <div styleName="subject-row">
              <IssueInfoPane issue={issue} size="medium"/>
              <ChildIssuesPane issue={issue}/>
            </div>
          </div>
          <IssueController issue={issue}/>
        </div>
        <div styleName="bottom">
          <SimpleBar styleName="scroll">
            <article styleName="article">
              {(!!issue.description) && (
                <>
                  <h3 styleName="heading">説明</h3>
                  <Markdown>
                    {issue.description}
                  </Markdown>
                </>
              )}
              {(!!issue.requirement) && (
                <>
                  <h3 styleName="heading">終了条件</h3>
                  <Markdown>
                    {issue.requirement}
                  </Markdown>
                </>
              )}
            </article>
          </SimpleBar>
          <SimpleBar styleName="scroll">
            <section styleName="article">
              <h3 styleName="heading">コメント</h3>
              <NoteList issue={issue}/>
            </section>
          </SimpleBar>
        </div>
      </div>
    );

  }
);
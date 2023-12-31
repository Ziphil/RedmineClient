//

import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {Markdown} from "/renderer/component/atom/markdown";
import {create} from "/renderer/component/create";
import {IssueInfoView} from "/renderer/component/module/issue-info-view";
import {IssueSubjectView} from "/renderer/component/module/issue-subject-view";
import {DetailedIssue, Issue} from "/renderer/type";
import {IssueController} from "./issue-controller";
import {NoteView} from "./note-view";


export const IssueView = create(
  require("./issue-view.scss"), "IssueView",
  function ({
    issue,
    ancestorIssues
  }: {
    issue: DetailedIssue,
    ancestorIssues: Array<Issue>
  }): ReactElement {

    return (
      <div styleName="root">
        <div styleName="top">
          <div styleName="subject">
            <IssueSubjectView issue={issue} ancestorIssues={ancestorIssues} size="medium"/>
            <IssueInfoView issue={issue} size="medium"/>
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
              <NoteView issue={issue}/>
            </section>
          </SimpleBar>
        </div>
      </div>
    );

  }
);
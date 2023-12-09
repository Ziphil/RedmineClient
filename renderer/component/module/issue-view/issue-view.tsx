//

import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {Markdown} from "/renderer/component/atom/markdown";
import {create} from "/renderer/component/create";
import {IssueSubjectView} from "/renderer/component/module/issue-subject-view";
import {Issue} from "/renderer/type";
import {IssueController} from "./issue-controller";
import {NoteView} from "./note-view";


export const IssueView = create(
  require("./issue-view.scss"), "IssueView",
  function ({
    issue
  }: {
    issue: Issue
  }): ReactElement {

    return (
      <div styleName="root">
        <div styleName="top">
          <div styleName="subject">
            <IssueSubjectView issue={issue} size="medium"/>
          </div>
          <IssueController issue={issue}/>
        </div>
        <div styleName="bottom">
          <SimpleBar styleName="scroll">
            <Markdown styleName="article">
              {issue.description}
            </Markdown>
          </SimpleBar>
          <SimpleBar styleName="scroll">
            <div styleName="article">
              <NoteView issue={issue}/>
            </div>
          </SimpleBar>
        </div>
      </div>
    );

  }
);
//

import dayjs from "dayjs";
import {ReactElement} from "react";
import {Markdown} from "/renderer/component/atom/markdown";
import {create} from "/renderer/component/create";
import {DateView} from "/renderer/component/module/date-view";
import {useSuspenseResponse} from "/renderer/hook/request";
import {Issue} from "/renderer/type";


export const NoteList = create(
  require("./note-list.scss"), "NoteList",
  function ({
    issue
  }: {
    issue: Issue
  }): ReactElement {

    const [notes] = useSuspenseResponse("fetchNotes", window.api.fetchNotes, {issueId: issue.id});

    return (
      <div styleName="root">
        {notes.map((note) => (
          <article styleName="note" key={note.id}>
            <div styleName="top">
              <div styleName="name">
                {note.user.name}
              </div>
              <div styleName="date">
                <DateView date={dayjs(note.createdDate)} orientation="horizontal"/>
                <span>{dayjs(note.createdDate).format("HH:mm")}</span>
              </div>
            </div>
            <Markdown styleName="content">
              {note.content}
            </Markdown>
          </article>
        ))}
      </div>
    );

  }
);
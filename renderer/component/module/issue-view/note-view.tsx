//

import {ReactElement} from "react";
import {Markdown} from "/renderer/component/atom/markdown";
import {create} from "/renderer/component/create";
import {useSuspenseQuery} from "/renderer/hook/request";
import {Issue} from "/renderer/type";


export const NoteView = create(
  require("./note-view.scss"), "NoteView",
  function ({
    issue
  }: {
    issue: Issue
  }): ReactElement {

    const [notes] = useSuspenseQuery("fetchNotes", window.api.fetchNotes, {issueId: issue.id});

    return (
      <div styleName="root">
        {notes.map((note) => (
          <article key={note.id}>
            <Markdown>
              {note.content}
            </Markdown>
          </article>
        ))}
      </div>
    );

  }
);
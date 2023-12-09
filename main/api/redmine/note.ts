//

import {client} from "/main/api/client";
import {renderMarkdown} from "/main/util/markdown";
import {Id} from "/renderer/type/common";
import {Note} from "/renderer/type/note";


export async function fetchNotes({issueId}: {issueId: Id}): Promise<Array<Note>> {
  const params = {
    include: "journals"
  };
  const response = await client.get(`/issues/${issueId}.json`, {params});
  const rawJournals = response.data.issue.journals as Array<any>;
  const notes = rawJournals.filter((rawJournal) => !!rawJournal.notes).map(createNote);
  return notes;
}

export async function addNote({issueId, content}: {issueId: Id, content: string}): Promise<void> {
  const body = {
    issue: {
      notes: content
    }
  };
  await client.put(`/issues/${issueId}.json`, body);
}

function createNote(rawJoural: Record<string, any>): Note {
  return {
    id: rawJoural.id,
    content: renderMarkdown(rawJoural.notes),
    user: {id: rawJoural.user.id, name: rawJoural.user.name},
    createdDate: rawJoural.createdOn
  };
}
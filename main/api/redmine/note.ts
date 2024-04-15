//

import {client} from "/main/api/client";
import {renderMarkdown} from "/main/util/markdown";
import {Id} from "/renderer/type/common";
import {Note} from "/renderer/type/note";


export async function fetchNotes({issueId}: {issueId: Id}): Promise<Array<Note>> {
  const response = await client.get(`/issues/${issueId}.json`, {params: {include: "journals"}});
  const rawJournals = response.data.issue.journals as Array<any>;
  const notes = rawJournals.filter((rawJournal) => !!rawJournal.notes).map(createNote);
  return notes;
}

export async function addNote({issueId, content}: {issueId: Id, content: string}): Promise<void> {
  await client.put(`/issues/${issueId}.json`, {issue: {notes: content}});
}

function createNote(rawJoural: Record<string, any>): Note {
  const note = {
    id: rawJoural.id,
    content: renderMarkdown(rawJoural.notes),
    user: {id: rawJoural.user.id, name: rawJoural.user.name},
    createdDate: rawJoural.createdOn
  } satisfies Note;
  return note;
}
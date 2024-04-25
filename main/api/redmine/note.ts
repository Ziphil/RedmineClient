//

import {Settings} from "/main/api/settings";
import {renderMarkdown} from "/main/util/markdown";
import type {Id, Note} from "/renderer/type";


export async function fetchNotes({issueId}: {issueId: Id}): Promise<Array<Note>> {
  console.log("api called", "fetchNotes");
  const settings = await Settings.get();
  const response = await settings.client.get(`/issues/${issueId}.json`, {params: {include: "journals"}});
  const rawJournals = response.data.issue.journals as Array<any>;
  const notes = rawJournals.filter((rawJournal) => !!rawJournal.notes).map(createNote);
  return notes;
}

export async function addNote({issueId, content}: {issueId: Id, content: string}): Promise<void> {
  console.log("api called", "addNote");
  const settings = await Settings.get();
  await settings.client.put(`/issues/${issueId}.json`, {issue: {notes: content}});
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
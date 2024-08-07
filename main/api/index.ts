//

import {
  fetchActivities
} from "/main/api/redmine/activity";
import {
  changeIssueStatus,
  fetchAncestorIssues,
  fetchChildIssues,
  fetchDescendantIssues,
  fetchHierarchicalIssueGroups,
  fetchIssue,
  fetchIssueHasChildren
} from "/main/api/redmine/issue";
import {
  addNote,
  fetchNotes
} from "/main/api/redmine/note";
import {
  fetchSettings
} from "/main/api/redmine/settings";
import {
  addSpentTime
} from "/main/api/redmine/spent-time";
import {
  fetchUser
} from "/main/api/redmine/user";


export const API_CATALOG = {
  fetchHierarchicalIssueGroups,
  fetchAncestorIssues,
  fetchChildIssues,
  fetchDescendantIssues,
  fetchIssue,
  fetchIssueHasChildren,
  changeIssueStatus,
  addSpentTime,
  fetchNotes,
  addNote,
  fetchUser,
  fetchActivities,
  fetchSettings
};

export type ApiCatalog = typeof API_CATALOG;
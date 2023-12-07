//

import {
  addSpentTime,
  fetchHierarchicalIssues,
  fetchIssue,
  makeIssueDone
} from "/main/api/redmine/issue";


export const APIS = {
  fetchHierarchicalIssues,
  fetchIssue,
  makeIssueDone,
  addSpentTime
};

export type ApiTypes = typeof APIS;
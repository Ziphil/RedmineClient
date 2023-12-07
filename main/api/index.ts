//

import {
  addSpentTime,
  fetchIssue,
  fetchIssues,
  makeIssueDone
} from "/main/api/redmine/issue";


export const APIS = {
  fetchIssues,
  fetchIssue,
  makeIssueDone,
  addSpentTime
};

export type ApiTypes = typeof APIS;
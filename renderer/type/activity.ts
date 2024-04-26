//

import {Id} from "/renderer/type/common";
import {Issue} from "/renderer/type/issue";


export interface TimeActivity {

  type: "time";
  id: Id;
  project: {id: Id, name: string};
  issue: {id: Id};
  time: number;
  date: string;

}


export interface CloseActivity {

  type: "close";
  id: Id;
  project: {id: Id, name: string};
  issue: Issue;
  date: string;

}


export type Activity = TimeActivity | CloseActivity;
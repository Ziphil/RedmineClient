//

import {Id} from "/renderer/type/common";


export interface Settings {

  redmineUrl: string;
  activityId: number;
  exceptionalOffDates: Array<string>;
  projectPriorities: Array<[Id, number]>;

}
//

import {Id} from "/renderer/type/common";


export interface Settings {

  activityId: number;
  exceptionalOffDates: Array<string>;
  projectPriorities: Array<[Id, number]>;

}
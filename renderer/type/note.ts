//

import {HtmlString, Id} from "/renderer/type/common";


export interface Note {

  id: Id;
  content: HtmlString;
  user: {id: Id, name: string};
  createdDate: string;

}

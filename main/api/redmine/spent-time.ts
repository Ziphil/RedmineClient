//

import {client} from "/main/api/client";
import {Id} from "/renderer/type/common";


/** 指定されたイシューに作業時間を追加します。
 * 追加される作業時間の種類は「開発作業 (ID 9)」になります。 */
export async function addSpentTime({issueId, time}: {issueId: Id, time: number}): Promise<void> {
  await client.post("/time_entries.json", {timeEntry: {
    issueId,
    activityId: 9,
    hours: time / 1000 / 60 / 60
  }});
}
//

import {Settings} from "/main/api/settings";
import type {Id} from "/renderer/type";


/** 指定されたイシューに作業時間を追加します。
 * 追加される作業時間の作業分類は「開発作業 (ID 9)」になります。 */
export async function addSpentTime({issueId, time}: {issueId: Id, time: number}): Promise<void> {
  console.log("api called", "addSpentTime");
  const settings = await Settings.get();
  await settings.client.post("/time_entries.json", {timeEntry: {
    issueId,
    activityId: settings.activityId,
    hours: time / 1000 / 60 / 60
  }});
}
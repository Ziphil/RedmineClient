//

import {getSettings} from "/main/api/settings";
import {Settings} from "/renderer/type/settings";


export async function fetchSettings({}: {}): Promise<Settings> {
  console.log("api called", "fetchSettings");
  const rawSettings = await getSettings();
  const settings = {
    activityId: rawSettings.activityId,
    exceptionalOffDates: rawSettings.exceptionalOffDates,
    projectPriorities: rawSettings.projectPriorities
  } satisfies Settings;
  return settings;
}
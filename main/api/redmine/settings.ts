//

import {Settings} from "/main/api/settings";
import type {Settings as SkeletalSettings} from "/renderer/type";


export async function fetchSettings({}: {}): Promise<SkeletalSettings> {
  console.log("api called", "fetchSettings");
  const settings = await Settings.get();
  const skeletalSettings = {
    redmineUrl: settings.redmineUrl,
    activityId: settings.activityId,
    exceptionalOffDates: settings.exceptionalOffDates,
    projectPriorities: settings.projectPriorities
  } satisfies SkeletalSettings;
  return skeletalSettings;
}
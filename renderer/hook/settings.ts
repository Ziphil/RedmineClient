//

import {atom, useRecoilValue} from "recoil";
import {Settings} from "/renderer/type/settings";


const settingsAtom = atom<Settings>({
  key: "settings",
  default: window.api.fetchSettings({})
});

export function useSettings(): Settings {
  const settings = useRecoilValue(settingsAtom);
  return settings;
}

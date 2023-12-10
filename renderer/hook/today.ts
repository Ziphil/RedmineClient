//

import dayjs, {Dayjs} from "dayjs";
import {useEffect} from "react";
import {atom, useRecoilValue, useSetRecoilState} from "recoil";


const todayAtom = atom<Dayjs>({
  key: "today",
  default: dayjs().locale("ja").startOf("day")
});

export function useToday(): Dayjs {
  const today = useRecoilValue(todayAtom);
  return today;
}

export function useAutoUpdateToday(): void {
  const setToday = useSetRecoilState(todayAtom);
  useEffect(() => {
    const interval = setInterval(() => {
      setToday((today) => {
        const nextToday = dayjs().startOf("day");
        if (today.isSame(nextToday, "day")) {
          return today;
        } else {
          return nextToday;
        }
      });
    }, 1000 * 60);
    return () => clearInterval(interval);
  });
}
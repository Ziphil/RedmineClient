//

import {Dispatch, SetStateAction} from "react";
import {atom, useRecoilState} from "recoil";
import {Work} from "/renderer/type";


const workAtom = atom<Work | null>({
  key: "work",
  default: null
});

export function useWork(): [Work | null, Dispatch<SetStateAction<Work | null>>] {
  const [work, setWork] = useRecoilState(workAtom);
  return [work, setWork];
}
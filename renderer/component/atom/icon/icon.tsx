/* eslint-disable no-useless-computed-key */

import {IconPathData} from "@fortawesome/fontawesome-svg-core";
import {IconDefinition} from "@fortawesome/pro-regular-svg-icons";
import {css} from "@linaria/core";
import {ReactElement, useEffect, useRef, useState} from "react";
import {scalePathUp} from "/renderer/util/path";


const styles = {
  root: css`
  `
};

export const Icon = function ({
  icon,
  className,
  ...data
}: {
  icon: IconDefinition,
  className?: string
}): ReactElement {

  const ref = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(0);

  const [width, height, name, , path] = icon.icon;

  useEffect(() => {
    if (ref.current) {
      const fontSize = parseFloat(getComputedStyle(ref.current).fontSize);
      const ratio = fontSize / height;
      setRatio(ratio);
    }
  }, [height]);

  return (
    <div className={[styles.root, className].join(" ")} ref={ref} style={createStyle(width, height, ratio, path)} {...data}/>
  );

};


function createStyle(width: number, height: number, ratio: number, path: IconPathData): object {
  if (typeof path === "string") {
    const style = {
      width: `${width * ratio}px`,
      height: `${height * ratio}px`,
      clipPath: `path('${scalePathUp(path, ratio)}')`
    };
    return style;
  } else {
    return {};
  }
}
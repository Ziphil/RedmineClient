//


export function scalePathUp(path: string, ratio: number): string {
  const fixedPath = path.replace(/(-?[0-9.]+)/g, (match) => {
    return (parseFloat(match) * ratio).toString();
  });
  return fixedPath;
}
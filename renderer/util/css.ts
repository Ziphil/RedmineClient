//


export function gradientBackground(lightness: number): string {
  const css = `
    background-image: linear-gradient(to right bottom, hsl(220, 95%, ${lightness * 100}%), hsl(320, 90%, ${lightness * 100}%));
    background-attachment: fixed;
`;
  return css;
}

export function textColor(): string {
  return "hsl(270, 10%, 20%)";
}

export function borderColor(): string {
  return "hsla(270, 10%, 50%, 0.35)";
}
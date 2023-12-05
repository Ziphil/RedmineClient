//


export function gradientBackground(lightness: number): string {
  const css = `
    background-image: linear-gradient(to right bottom, hsl(220, 70%, ${lightness * 100}%), hsl(320, 65%, ${lightness * 100}%));
    background-attachment: fixed;
`;
  return css;
}

export function gradientText(lightness: number): string {
  const css = `
    background-image: linear-gradient(to right bottom, hsl(220, 70%, ${lightness * 100}%), hsl(320, 65%, ${lightness * 100}%));
    background-attachment: fixed;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;
  return css;
}

export function iconFont(): string {
  const css = `
    font-family:"Font Awesome 5 Free";
    font-weight: 900;
  `;
  return css;
}

export function textColor(): string {
  return "hsl(270, 10%, 20%)";
}

export function borderColor(): string {
  return "hsla(270, 10%, 50%, 0.25)";
}
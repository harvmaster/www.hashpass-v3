interface SeededRandom {
  next: () => number;
}

export const generateColors = (seed: SeededRandom): [string, string] => {
  const baseHue = Math.round(seed.next() * 330);

  const getColor = () => {
    const hue = baseHue + Math.round(seed.next() * 60) - 30;
    const saturation = 70
    const lightness = 72
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  };

  return [getColor(), getColor()];
}

export default generateColors;
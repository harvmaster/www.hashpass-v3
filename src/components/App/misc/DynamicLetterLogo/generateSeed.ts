import { hexToBase58 } from "src/crypto/base58";
import getHash from "src/crypto/sha256";

interface SeededRandom {
  next: () => number;
}

export const generateSeed = (input: string): SeededRandom => {
  const seedString = hexToBase58(getHash(input));

  let seed = 0;
  for (let i = 0; i < seedString.length; i++) {
    seed = (seed << 5) - seed + seedString.charCodeAt(i);
    seed |= 0; // Convert to 32-bit integer
  }

  const next = (): number => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  return { next };
}

export default generateSeed;
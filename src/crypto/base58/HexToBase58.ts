// const base58Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// function hexToBase58(hex: string) {
//     const bytes = Buffer.from(hex, 'hex');

//     let result = '';
//     const digits = [0];

//     for (let i = 0; i < bytes.length; i++) {
//         for (let j = 0; j < digits.length; j++) {
//             digits[j] <<= 8;
//         }

//         digits[0] += bytes[i];

//         let carry = 0;

//         for (let j = 0; j < digits.length; ++j) {
//             digits[j] += carry;

//             carry = (digits[j] / 58) | 0;
//             digits[j] %= 58;
//         }

//         while (carry) {
//             digits.push(carry % 58);

//             carry = (carry / 58) | 0;
//         }
//     }

//     for (let i = 0; bytes[i] === 0 && i < bytes.length - 1; i++) {
//         result += base58Alphabet[0];
//     }

//     for (let i = digits.length - 1; i >= 0; i--) {
//         result += base58Alphabet[digits[i]];
//     }

//     return result;
// }

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const ALPHABET_MAP = {};
const BASE = 58;

// Pre-compute the ALPHABET_MAP for fast lookup
for (let i = 0; i < ALPHABET.length; i++) {
    ALPHABET_MAP[ALPHABET.charAt(i)] = i;
}

export function hexToBase58(hex: string): string {
    if (hex.length % 2 !== 0) {
        throw new Error('Hex string has an odd length!');
    }

    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }

    const digits = [0];
    for (let i = 0; i < bytes.length; i++) {
        for (let j = 0; j < digits.length; j++) {
            digits[j] <<= 8;
        }

        digits[0] += bytes[i];

        let carry = 0;
        for (let j = 0; j < digits.length; j++) {
            digits[j] += carry;

            carry = (digits[j] / BASE) | 0;
            digits[j] %= BASE;
        }

        while (carry) {
            digits.push(carry % BASE);
            carry = (carry / BASE) | 0;
        }
    }

    let prefix = '';
    for (let i = 0; i < bytes.length; i++) {
        if (bytes[i] !== 0) break;
        prefix += ALPHABET[0];
    }

    return prefix + digits.reverse().map(d => ALPHABET[d]).join('');
}

export default hexToBase58;
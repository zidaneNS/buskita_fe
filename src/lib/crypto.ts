const d = parseInt(process.env.PRIVATE_KEY_D as string);
const n = parseInt(process.env.PRIVATE_KEY_N as string);

export const PUBLIC_KEY: number[] = [29, 5141];
export const PRIVATE_KEY: number[] = [d, n];
export const m_digit = 4;

const modPow = (base: number, exponent: number, modulus: number): number => {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

export const generateAscii = (plain: string, m_digit: number): string => {
    const plainArr = plain.split('');
    
    const result = plainArr.map(el => {
        const charCode = el.charCodeAt(0).toString();
        return charCode.padStart(m_digit, '0');
    })

    return result.join('');
}

export const cryptoEncrypt = (plainText: string, publicKey: number[], m_digit: number): string => {
    const preparedPlainText: number[] = [];

    for(let i = 0; i < plainText.length; i += m_digit) {
        preparedPlainText.push(parseInt(plainText.slice(i, i + m_digit)));
    }

    const result = preparedPlainText.map(el => {
        const cipher = modPow(el, publicKey[0], publicKey[1]);

        return cipher.toString().padStart(m_digit, '0');
    });

    return result.join('');
}

export const cryptoDecrypt = (cipherText: string, privateKey: number[], m_digit: number): string => {
    const preparedCipherText: number[] = [];

    for(let i = 0; i < cipherText.length; i += m_digit) {
        preparedCipherText.push(parseInt(cipherText.slice(i, i + m_digit)));
    }

    const result = preparedCipherText.map(el => {
        const cipher = modPow(el, privateKey[0], privateKey[1]);

        return cipher.toString().padStart(m_digit, '0');
    });

    return result.join('');
}

export const generatePlain = (plainText: string, m_digit: number) => {
    const plainArr = [];

    for (let i = 0; i < plainText.length; i += m_digit) {
        plainArr.push(parseInt(plainText.slice(i, i + m_digit)));
    }

    const result = plainArr.map(el => String.fromCharCode(el));

    return result.join('');
}
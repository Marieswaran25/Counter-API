export function genRandomKey():string{
    const char="ASDFGHJ24KLwertyui44345opasdfghjklzcvbnmQWERTYUIOP1267890ZCVBNM"
    let key = "";
    for (let i = 0; i < 13; i++) {
        const random = Math.floor(Math.random() * char.length);
        key += char[random];
        if (i!==0 && i % 3 === 0 && i !== 12) {
            key += '-';
        }
    }
    return key;
}


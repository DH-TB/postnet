function zipcode2Barcode(zipcode) {
    if (!validateZipcode(zipcode)) {
        return {success: false, error: 'invalid_zipcode'};
    }

    const zipcodeWithoutDash = formatZipcode(zipcode);
    const zipcodeInDigitArray = toDigitArray(zipcodeWithoutDash);
    const checkDigit = calculateCheckDigit(zipcodeInDigitArray);
    const barcode = toBarcode(zipcodeInDigitArray.concat(checkDigit));
    const value = formatBarcode(barcode);
    return {success: true, value};
}

function toDigitArray(barcode) {
    return barcode.split('').map(c => parseInt(c));
}

function validateZipcode(zipcode) {
    return /^\d{5}$/.test(zipcode)
        || /^\d{9}$/.test(zipcode)
        || /^\d{5}-\d{4}/.test(zipcode);
}

function calculateCheckDigit(barcode) {
    const sum = barcode.reduce((a, b) => a + b);

    // return sum % 10 == 0 ? 0 : 10 - sum % 10;
    return (10 - sum % 10) % 10;
}

function formatZipcode(zipcode) {
    return zipcode.replace('-', '');
}

function toBarcode(zipcode) {
    const table = [
        '||:::', ':::||', '::|:|', '::||:', ':|::|',
        ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'
    ];
    return zipcode
        .map(i => table[i])
        .join('');
}

function formatBarcode(barcode) {
    return `|${barcode}|`;
}

module.exports = {
    zipcode2Barcode
}
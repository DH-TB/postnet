"use strict";

function zipcode2Barcode(zipcode) {
    if (!validateZipcode(zipcode)) {
        const success = false;
        const error = 'invalid_zipcode';
        return {success, error};
    }

    const zipcodeWithoutDash = formatZipcode(zipcode);
    const zipcodeInDigitArray = toDigitArray(zipcodeWithoutDash);
    const checkDigit = calculateCheckDigit(zipcodeInDigitArray);
    var barcode = toBarcode(zipcodeInDigitArray.concat(checkDigit));
    const value = formatBarcode(barcode);
    const success = true;
    return {success, value};
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
    const sum = barcode.reduce((sum, i) => sum + i);

    return sum % 10 == 0 ? 0 : 10 - sum % 10;
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
const table = [
    '||:::', ':::||', '::|:|', '::||:', ':|::|',
    ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'
];

function barcode2Zipcode(barcode) {
    if (!validateBarcode(barcode)) {
        return {success: false, error: 'invalid_barcode'};
    }

    const barcodeWithoutBorder = removeBorder(barcode);
    const digits= barcodeToDigits(barcodeWithoutBorder);

    if (!validateCheckDigit(digits)) {
        return {success: false, error: 'check_digit_not_match'};
    }

    const zipcode = toZipcode(digits);
    const formattedZipcode = align(zipcode);
    return {success: true, value: formattedZipcode}
}

function sum(digits) {
    return digits.reduce((a, b) => a + b);
}

function validateCheckDigit(digits) {
    return sum(digits) % 10 === 0;
}

function validateBarcode(barcode) {
    const length = barcode.length;
    return barcode.match(/^\|[:|]+\|$/) && [32, 52].includes(length);
}

function align(zipcode) {
    if (zipcode.length === 9) {
        return `${zipcode.slice(0, 5)}-${zipcode.slice(5)}`;
    }

    return zipcode;
}

function toZipcode(digits) {
    return digits.join('').slice(0, -1);
}

function barcodeToDigits(barcode) {
    return barcode
        .match(/.{1,5}/g)
        .map(str => table.indexOf(str));
}

function removeBorder(barcode) {
    return barcode.slice(1, -1);
}

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
    return (10 - sum(barcode) % 10) % 10;
}

function formatZipcode(zipcode) {
    return zipcode.replace('-', '');
}

function toBarcode(zipcode) {
    return zipcode
        .map(i => table[i])
        .join('');
}

function formatBarcode(barcode) {
    return `|${barcode}|`;
}

module.exports = {
    zipcode2Barcode,
    barcode2Zipcode
}
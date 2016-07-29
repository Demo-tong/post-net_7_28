'use strict';

//barcode to postcode
function loadPostCodes() {
  return ["||:::", ":::||", "::|:|", "::||:", ":|::|", ":|:|:", ":||::",
    "|:::|", "|::|:", "|:|::"];
}

function transferToPostCode(barcodeString) {
  let legalResult = isLegalBarcode(barcodeString);

  if (!legalResult) {
    return false;
  }
  let allZipCodes = loadPostCodes();
  let postCodes = getPostNumber(allZipCodes, barcodeString);
  if (isLegalCheckDigit(postCodes)) {
    return formatPostCode(postCodes);
  }
}

function isLegalBarcode(barcodeString) {
  return /^\| [:| ]+\|$/.test(barcodeString);
}

function getPostNumber(allZipCodes, barcodeString) {
  let postNumber = [];
  let temp = barcodeString.split(" ").slice(1, -1);

  temp.forEach(function (item) {
    let pos = allZipCodes.indexOf(item);
    if (pos) {
      postNumber.push(pos);
    }
  });

  return postNumber;
}

function isLegalCheckDigit(postCodes) {

  let total = postCodes.reduce(function (fir, sec) {
    return fir + sec;
  });

  return (total % 10) ? false : true;
}

function formatPostCode(postCodes) {
  let formatedPostCode = postCodes.slice(0);

  if (formatedPostCode.length === 10) {
    formatedPostCode.splice(5, 0, '-');
  }
  let item = formatedPostCode.pop();

  return formatedPostCode.join('');
}

module.exports = {
  loadPostCodes: loadPostCodes,
  transferToPostCode: transferToPostCode,
  isLegalBarcode: isLegalBarcode,
  getPostNumber: getPostNumber,
  isLegalCheckDigit: isLegalCheckDigit,
  formatPostCode: formatPostCode
}
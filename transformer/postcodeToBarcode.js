/**
 * Created by tong on 16-7-28.
 */
'use strict';

function loadPostCodes() {
  return ["||:::", ":::||", "::|:|", "::||:", ":|::|", ":|:|:", ":||::",
    "|:::|", "|::|:", "|:|::"];
}

//postcode to barcode
function transferToBarcode(postCodeString) {
  let checkResult = isFormatString(postCodeString);
  if (!checkResult) {
    return false;
  }

  let allZipCodes = loadPostCodes();
  let formatedNumbers = getFormatNumbers(postCodeString);
  let checkDigit = getCheckDigit(formatedNumbers);

  return generateBarcode(allZipCodes, checkDigit, formatedNumbers);
}


function isFormatString(postCodeString) {
  let result = [];

  let temp = postCodeString.replace('-', '');
  temp = temp.split('');

  if (temp.length === 5 || temp.length === 9) {
    temp.forEach(function (item) {
      result.push(parseInt(item));
    });
    for (let item of result) {
      if (!(item >= 0 && item <= 9)) {
        return "error letter";
      }
    }
    return true;
  }
  return "error length(the length should be 5/9/10)";
}


function isFormatString2(postCodeString) {
  let result = checkLength(postCodeString);
  if (result === true) {
    return checkOtherLetter(postCodeString);

    //  return result;
  }
  return result;
//  return checkOtherLetter(postCodeString);
}

function checkLength(postCodeString) {
  let result = /^\d{5}$|^\d{9}$|^\d{5}-\d{4}$/.test(postCodeString);
  if (!result) {
    result = "the length of number is illegal(the length should be 5/9/10)";
  }
  return result;
}

function checkOtherLetter(postCodeString) {
  let result = /^[\d-]+$/.test(postCodeString);
  if (!result) {
    result = "the input contains other letter";
  }

  return result;
}

function getFormatNumbers(postCodeString) {
  let temp = postCodeString.replace('-', '').split("");

  return temp.map(function (item) {
    return parseInt(item);
  });
}

function getCheckDigit(formatedNumbers) {
  let total = formatedNumbers.slice(0)
          .reduce(function (fir, sec) {
            return fir + sec;
          });
  let cd = 10 - total % 10;
  return cd;
}

function generateBarcode(allZipCodes, checkDigit, formatedNumbers) {
  let formatedBarcode = formatedNumbers.map(function (item) {
    return allZipCodes[item];
  }).join('');

  return '|' + formatedBarcode + allZipCodes[checkDigit] + '|';
}

module.exports = {
  loadPostCodes: loadPostCodes,
  transferToBarcode: transferToBarcode,
  isFormatString: isFormatString,
  getFormatNumbers: getFormatNumbers,
  getCheckDigit: getCheckDigit,
  generateBarcode: generateBarcode
}
'use strict';

const repl = require('repl');
const bTop = require('./transformer/barcodeToPostcode.js');
const pTob = require('./transformer/postcodeToBarcode.js');

function switchRouter(context, done) {
  let router = actions.find(item => item.name === currentAction);
  let result = router.doAction(context.cmd);
  let newRouter = actions.find(item => item.name === result);
  currentAction = newRouter.name;
  console.log(newRouter.help);
  done(null);
}

function handleCmd(cmd, context, filename, done) {
  switchRouter({
    cmd: cmd.trim()
  }, done);
  done(null);
}

var replServer = repl.start({prompt: "> ", eval: handleCmd});

const actions = [{
  name: 'init',
  help: "\t\t--------------------------\n" +
  "\t\t||\t   首页\n" +
  "\t\t|| 1---postcode to barcode\n" +
  "\t\t|| 2---barcode to postcode\n" +
  "\t\t|| q---exit\n" +
  "\t\t--------------------------\n" +
  "Please input your number:",
  doAction: function (cmd) {
    switch (cmd) {
      case '1':
        return 'postcodeToBarcode';
      case '2':
        return 'barcodeToPostcode';
      case 'q':
        replServer.close();
        process.exit(0);
        return;
      default:
        console.log("无效的输入");
        return 'init'
    }
  }
}, {
  name: 'postcodeToBarcode',
  help: '\t\t-------------------------\n' +
  '\t\t||\t邮编转条码首页\n' +
  '\t\t|| 1---input the barcode\n' +
  '\t\t|| 2---back to previous\n' +
  '\t\t|| q---exit\n' +
  '\t\t-------------------------\n' +
  'Please input your number:',
  doAction: function (cmd) {
    switch (cmd) {
      case '1':
        return 'input postcode';
      case '2':
        return 'init';
      case 'q':
        replServer.close();
        process.exit(0);
        return;
      default:
        console.log("无效的输入");
        return 'postcodeToBarcode';
    }
  }
}, {
  name: 'input postcode',
  help: "\n\n\t\t\t邮编转条码\nPlease input your postcode(q to exit):",
  doAction: function (cmd) {
    if (cmd === 'q') {
      return 'postcodeToBarcode';
    }
    console.log("The result is:");
    console.log(pTob.transferToBarcode(cmd.trim()));
    return 'input postcode';
  }
}, {
  name: 'barcodeToPostcode',
  help: '\t\t-------------------------\n' +
  '\t\t||\t条码转邮编首页\n' +
  '\t\t|| 1---input the barcode\n' +
  '\t\t|| 2---back to previous\n' +
  '\t\t|| q---exit\n' +
  '\t\t-------------------------\n' +
  'Please input your number:',
  doAction: function (cmd) {
    switch (cmd) {
      case '1':
        return 'input barcode';
      case '2':
        return 'init';
      case 'q':
        replServer.close();
        process.exit(0);
        return;
      default:
        console.log("无效的输入");
        return 'barcodeToPostcode';
    }
  }
}, {
  name: 'input barcode',
  help: "\n\n\t\t\t条码转邮编\nPlease input your barcode(q to exit):",
  doAction: function (cmd) {
    if (cmd === 'q') {
      return 'barcodeToPostcode';
    }
    console.log("The result is:");
    console.log(bTop.transferToPostCode(cmd.trim()));
    return 'input barcode';
  }
}];

let currentAction = 'init';
console.log(actions.find(item => item.name === currentAction).help);


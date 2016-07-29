'use strict';

const repl = require('repl');

function switchRouter(context, done) {
  let router = actions.find(item => item.name === currentAction);
  let result = router.doAction(context.cmd);
  let newRouter = actions.find(item => item.name === result);
  currentAction = newRouter.name;
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
  help: "初始化界面:1-number,2-letter",
  doAction: function(cmd) {
    switch(cmd) {
      case '1':
        return 'number';
      case '2':
        return 'letter';
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
  name: 'letter',
  help: 'letter的状态',
  doAction: function(cmd) {
    switch(cmd) {
      case 'a':
        return 'number'
      default:
        console.log("无效的输入");
        return 'init'
    } 
  }
}, {
  name: 'number',
  help: "number的状态",
  doAction: function(cmd) {
    switch(cmd) {
      case '1':
        return 'letter'
      default:
        console.log("无效的输入");
        return 'init'
    }
  }
}];

let currentAction = 'init';
console.log(actions.find(item => item.name === currentAction).help);


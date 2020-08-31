#!/usr/bin/env node
const axios = require('axios');
const color = require('chalk');
const cron = require('node-cron');
const { report, report1 } = require('./token_config.json');
function sendMessage() {
  axios({
    method: 'post',
    url: `https://oapi.dingtalk.com/robot/send?access_token=${report1}`,
    // url: `https://oapi.dingtalk.com/robot/send?access_token=${report}`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      "msgtype": "text", 
      "text": {
        "content": "沃尼玛温馨提示您，写周报啦~~~"
      }, 
      "at": {
        "atMobiles": [
        ], 
        "isAtAll": true
      }
    },
  }).then(() => {
    console.log(color.green('发送成功'));
  }).catch(error=>{
    console.log(color.yellow(error));
  });
}

cron.schedule('5 6 * * 1', () => {
  sendMessage();
});
// sendMessage();
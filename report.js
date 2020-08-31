#!/usr/bin/env node
const axios = require('axios');
const color = require('chalk');
const cron = require('node-cron');
const { report, report1 } = require('./token_config.json');
function sendMessage() {
  axios({
    method: 'post',
    url: `https://oapi.dingtalk.com/robot/send?access_token=${report}`,
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

// 东京时间18点 ===> 北京时间 17点
cron.schedule('0 18 * * 5', () => {
  sendMessage();
},{
  scheduled: true,
  timezone: "Asia/Tokyo"
});
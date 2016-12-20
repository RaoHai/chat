'use strict';
var qs = require('qs');
var request = require('request');

module.exports = {

  'GET /api/robot/init': function (req, res) {
    request(`https://cschat.cloud.alipay.com/client/init.json?${qs.stringify(req.query)}`, function(err, resp, body) {
      if (!err && resp.statusCode == 200) {
        res.json(JSON.parse(body));
      }
    });
  },

  'POST /api/robot/getanswer': function (req, res) {

    request(`https://cschat.cloud.alipay.com/client/chat.json?${qs.stringify(JSON.parse(req.body))}`, function(err, resp, body) {
      if (!err && resp.statusCode == 200) {
        var result = JSON.parse(body);
        if (result.data.knowledge) {
          return res.json({
            success: true,
            content: result.data.knowledge.content,
          });
        }
        return res.json({
          success: true,
          content: '对不起，我不知道你在说什么',
        });
      }
    });
  }
};

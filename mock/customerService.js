'use strict';

module.exports = {

  'GET /api/customerService/online': function (req, res) {
    res.json({
      success: true,
      serviceName: '王二',
      status: 1,
    });
  },
  'GET /api/customerService/offline': function (req, res) {
    res.json({
      success: true,
      status: -1,
    });
  },

};

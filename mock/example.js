'use strict';

module.exports = {

  'GET /api/example': function (req, res) {
    res.json({
      success: true,
      data: ['foo', 'bar'],
    });
  },

};

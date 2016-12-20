'use strict';

const users = [
  { id: 1, userName: '王二' },
  { id: 2, userName: '陈清扬' },
  { id: 3, userName: '李靖' },
  { id: 4, userName: '红拂女' },
  { id: 5, userName: '虬髯客' },
];

const actions = ['sessionStart', 'text', 'text', 'text', 'text', 'sessionClose'];
const setences = [
  '我心里很不受用，寂寞的好像大马路上的一棵歪脖子树',
  '我身上有很多伟大的友谊，要送给一切人。',
  '在我还是小神经时，有一回借了一套弗洛伊德全集，仔细地读了一遍。',
  '照我的看法，每个人的本性都是好吃懒作，好色贪淫，假如你克勤克俭，守身如玉，这就犯了矫饰之罪，比好吃懒作好色贪淫更可恶。',
  '当我沿着一条路走下去的时候,心里总想着另一条路上的事.',
  '后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。',
  '于是我想到每个人都有自己的本质，放到合适的地方就大放光彩，我的本质是流氓土匪一类。',
];

function getRandomInt(_min, _max) {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const startedUsers = [];

function getMessage() {
  const user = users[getRandomInt(0, users.length)];
  const type = actions[getRandomInt(0, actions.length)];

  return [{
    user,
    type,
    content: type === 'text' ? setences[getRandomInt(0, setences.length)] : null,
  }];
}

module.exports = {
  'GET /api/fetchMessage': function (req, res) {
    setTimeout(function () {
      if (req.query.t === '1') {
        res.json({
          success: true,
          content: [{
            type: 'sessionStart',
            sessionType: 'robot',
            cid: 208801,
            user: {
              userId: 1,
              userName: '王二',
            },
            robotParams: {
              tntInstId: 'ZPLKH1CN',
              scene: 'SCE00000039',
              robotCode: 'ROB00000106',
              terminal: 'PC',
              sceneCode: 'SCE00000039',
            },
          }],
        });
      } else {
        res.json({
          success: true,
          content: [],
        });
      }
    }, req.query.t === '1' ? 1 : getRandomInt(1, 5) * 1000);
  },

  'GET /api/visitorOffline/:id': function (req, res) {
    res.json({
      success: true,
    });
  },

};

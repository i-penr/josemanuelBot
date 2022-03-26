const { executeImgCmd } = require('../utils/localFiles');

module.exports = {

  'name': 'bachillerato',
  'description': 'Qué decir, bachillerato muy dificil etc',
  'aliases': ['bachi'],
  'cooldown': 2000,

  execute(msg, args) {
    executeImgCmd(msg, 'bachi', args[1]);
  },
};
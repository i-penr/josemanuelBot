const { executeImgCmd } = require('../utils/localFiles');

module.exports = {

  'name': 'calacas',
  'description': 'Unas calacas bien chidas',
  'aliases': ['calaca'],
  'cooldown': 2000,

  async execute(msg, args) {
    executeImgCmd(msg, 'calacas', args[1]);
  },
};
module.exports = {

  'name': 'fechaunion',
  'description': 'Muestra cuándo te has metido en este server',
  'aliases': ['funion'],
  'cooldown': 3000,

  execute(msg) {
    msg.channel.send('Te uniste a este servidor el ' + msg.member.joinedAt);
  },
};
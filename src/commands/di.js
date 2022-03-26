module.exports = {

  'name': 'di',
  'description': 'Jose Manuel dice lo que quieras',
  'aliases': ['say'],
  'cooldown': 5000,

  execute(msg, args) {
    args.shift();
    const text = args.join(' ');
    msg.delete();

    if (!text) {
      msg.reply('Tienes que decirme algo primero');
    } else {
      msg.channel.send(text);
    }
  },
};
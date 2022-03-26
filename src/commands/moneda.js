module.exports = {

  'name': 'moneda',
  'description': 'Lanza una moneda',
  'aliases': ['coinflip', 'cflip'],
  'cooldown': 3000,

  execute(msg, args, client) {
    const chance = Math.floor(Math.random() * 2);
    const cruz = client.emojis.cache.get('556441517158563870');
    const cara = client.emojis.cache.get('556442186183606302');
    if(chance == 0) {
      msg.reply(`Ha salido cara! ${cara}`);
    } else {
      msg.reply(`Ha salido cruz! ${cruz}`);
    }
  },
};
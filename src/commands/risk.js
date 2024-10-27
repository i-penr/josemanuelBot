module.exports = {

  'name': 'risk',
  'description': 'EL PUTO DADO DEL RISK',
  'aliases': [],
  'cooldown': 2000,

  execute(msg, args) {
    args.shift();
    const roll = Math.ceil(Math.random() * 9999) + 1;
    const text = args.join(' ');
    const bonusStr = /\(([^)]+)\)/.exec(args.at(-1));
    const bonus = bonusStr ? Number(bonusStr[1]) : 0;

    if (text.length === 0) {
      return msg.reply('Falta la acción, colega...');
    }

    msg.reply(`${text} \n\`roll\`: **${roll}**\n\`bonus\`: **${bonus}**\n**${roll}** + **${bonus}** = **${roll + bonus}**`);
  },
};
const { getBonusFromText, generateRollString, listenForMessageEdits } = require("../utils/riskUtils");

module.exports = {

  'name': 'risk',
  'description': 'EL PUTO DADO DEL RISK',
  'aliases': [],
  'cooldown': 2000,

  async execute(msg, args) {
    args.shift();
    const roll = msg.id;
    const text = args.join(' ');
    const bonus = getBonusFromText(text);

    if (text.length === 0) {
      return msg.reply('Falta la acción, colega...');
    }

    const reply = await msg.reply(generateRollString(text, bonus, roll));

    listenForMessageEdits(msg.client, msg, reply);
  },
};


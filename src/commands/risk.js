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

function getBonusFromText(text) {
  const parentheses = (text.match(/\(([^)]+)\)/g))?.map((e) => removeParenthesesFromString(e)).filter((e) => !isNaN(Number(e)));
  return parentheses ? Number(parentheses.at(-1)) : 0;
}

function getRollType(roll) {
  const last4 = roll.slice(-4);
  const last = parseInt(last4.slice(-1));

  const rollTypes = [
    {
      condition: () => parseInt(last4) % 1111 === 0,
      type: 'QUADS',
      territories: 15,
      extraAction: 'extra turn + build a new city',
    },
    {
      condition: () => parseInt(last4.slice(-3)) % 111 === 0,
      type: 'TRIPS',
      territories: 15,
      extraAction: 'extra turn + build a new city',
    },
    {
      condition: () => parseInt(last4.slice(-2)) % 11 === 0,
      type: 'DUBS',
      territories: 12,
      extraAction: 'extra turn',
    },
    {
      condition: () => last === 0,
      type: 'EPIC 0',
      territories: 12,
      extraAction: 'extra turn',
    },
    {
      condition: () => last >= 7,
      type: 'Golden Roll',
      territories: 9,
    },
    {
      condition: () => last >= 4,
      type: 'Silver Roll',
      territories: 6,
    },
    {
      condition: () => last >= 1,
      type: 'Bronze Roll',
      territories: 3,
    },
  ];

  const result = rollTypes.find(type => type.condition());

  if (result) {
    const { type, territories, extraAction } = result;
    const rollMsg = `***${type}***\n${territories} territories${extraAction ? ` + ${extraAction}` : ''}`;
    return { rollMsg, territories };
  }

  return { rollMsg: 'Invalid Roll', territories: 0 };
}

function generateRollString(text, bonus, roll) {
  const rollObj = getRollType(roll);

  return `${text} \n${rollObj.rollMsg}\n\`roll\`: **${roll}**\n\`bonus\`: **${bonus}**\n**${rollObj.territories}** + **${bonus}** = **${rollObj.territories + bonus}**`;
}

function removeParenthesesFromString(str) {
  return str.replace(/[()]/g, '')
}

function listenForMessageEdits(client, msg, reply) {
  const callback = (oldMessage, newMessage) => {
    if (newMessage.id === msg.id) {
      const text = newMessage.content.substr(newMessage.content.indexOf(" ") + 1);
      const bonus = getBonusFromText(text);

      reply.edit(generateRollString(text, bonus, msg.id));
    }
  }

  client.on('messageUpdate', callback);

  setTimeout(() => {
    client.off('messageUpdate', callback);
  }, 60000)
}
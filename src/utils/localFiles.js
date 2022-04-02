const fs = require('fs');
const request = require('request');

module.exports = {
  async executeImgCmd(msg, folderName, userInput) {
    const path = '../multimedia/img/' + folderName + '/';
    const images = fs.readdirSync(path);
    const chance = Math.floor(Math.random() * images.length) + 1;
    const index = (Number(userInput) <= images.length && Number(userInput) > 0) ? Number(userInput) : chance;
    console.log(index);


    if (msg.attachments.size === 0)
      msg.reply({ files: [path + images[index - 1]], allowedMentions: { repliedUser: false } });

    else if (msg.author.id === '220525113404030987' && userInput) {
      await saveToLocal(msg.attachments.first().url, path + userInput);
      msg.reply(`Imagen añadida correctamente 👍 (total: ${images.length + 1})`).then((m) => m.delete({ timeout: 3000 }));
    }
  },
};

async function saveToLocal(url, path) {
  request.get(url)
    .on('error', console.error)
    .pipe(fs.createWriteStream(path + '.jpg'));
}

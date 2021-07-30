const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'risa',
    description: 'Envía un gif riéndose.',
    aliases: ['laugh', 'reirse', 'reír', 'reir'],
    execute(client, message) {
      let gifs = ['https://i.imgur.com/Jk25pHF.gif', 'https://i.imgur.com/NUoVUNy.gif', 'https://i.imgur.com/zgeTekq.gif', 'https://i.imgur.com/U5ojzih.gif', 'https://i.imgur.com/Fh9R12Z.gif', 'https://i.imgur.com/G2fnLMU.gif', 'https://i.imgur.com/rV2TEca.gif', 'https://i.imgur.com/7Rtd6xY.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se parte de risa!!**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
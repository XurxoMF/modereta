const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nosé',
    description: 'Envía un gif encogiéndose de hombros.',
    aliases: ['shrug', 'idk', 'nose'],
    execute(client, message) {
      let gifs = ['https://i.imgur.com/NBKmfTM.gif', 'https://i.imgur.com/G0Meejy.gif', 'https://i.imgur.com/wh0llho.gif', 'https://i.imgur.com/AuWuDXW.gif', 'https://i.imgur.com/0lJ2Gg5.gif', 'https://i.imgur.com/USSgSEw.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se encoge de hombros**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'enamorado',
    description: 'Envía un gif in love.',
    aliases: ['amor', 'deredere', 'love'],
    execute(client, message) {
      let gifs = ['https://i.imgur.com/1xwrSEY.gif', 'https://i.imgur.com/vkndONk.gif', 'https://i.imgur.com/UlikAHV.gif', 'https://i.imgur.com/BmN0JIf.gif', 'https://i.imgur.com/Sfx6tm2.gif', 'https://i.imgur.com/6DWz73I.gif', 'https://i.imgur.com/lqtPs1x.gif', 'https://i.imgur.com/6BEe3Pk.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} 😍`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
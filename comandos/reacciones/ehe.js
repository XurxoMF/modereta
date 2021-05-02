const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ehe',
    description: 'Envía un gif con cara ehe. ;P',
    aliases: ['teehee'],
    execute(client, message) {
      message.delete();
      let gifs = ['https://i.imgur.com/qCpJhQw.gif', 'https://i.imgur.com/Jf2Synd.gif', 'https://i.imgur.com/VygrCy0.gif', 'https://i.imgur.com/XLGx07e.gif', 'https://i.imgur.com/PjzUS5K.gif', 'https://i.imgur.com/aoFe0CL.gif', 'https://i.imgur.com/4x0FgrS.gif', 'https://i.imgur.com/RytNWQZ.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** ;P**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
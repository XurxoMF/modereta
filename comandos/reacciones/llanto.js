const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'llanto',
    description: 'Envía un gif llorando.',
    aliases: ['cry', 'llorar'],
    execute(client, message) {
      let gifs = ['https://i.imgur.com/BKwjUpy.gif', 'https://i.imgur.com/byhHJiJ.gif', 'https://i.imgur.com/d3Qffmo.gif', 'https://i.imgur.com/EAJQYIk.gif', 'https://i.imgur.com/QcEwL74.gif', 'https://i.imgur.com/U40iqsp.gif', 'https://i.imgur.com/5I2Zoxr.gif', 'https://i.imgur.com/L3d09Aj.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** está llorando **`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
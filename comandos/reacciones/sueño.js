const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'sueño',
    description: 'Envía un gif durmiendo.',
    aliases: ['sleepy', 'dormir'],
    execute(client, message) {
      message.delete();
      let gifs = ['https://i.imgur.com/fOZuX3p.gif', 'https://i.imgur.com/zlfD2MU.gif', 'https://i.imgur.com/7DsCGDs.gif', 'https://i.imgur.com/81DQPTt.gif', 'https://i.imgur.com/B1kRMoL.gif', 'https://i.imgur.com/h9RIDrd.gif', 'https://i.imgur.com/uNVsA95.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se está quedando dormido!!**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
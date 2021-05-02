const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'okey',
    description: 'Envía un gif diciendo ok.',
    aliases: ['ok', 'thumbsup', 'thumbs'],
    execute(client, message) {
      message.delete();
      let gifs = ['https://i.imgur.com/ijWUJrB.gif', 'https://i.imgur.com/PJ6ObqC.gif', 'https://i.imgur.com/d7suuUx.gif', 'https://i.imgur.com/m8SOaC1.gif', 'https://i.imgur.com/8zV6A0T.gif', 'https://i.imgur.com/HeSJSHO.gif', 'https://i.imgur.com/Kg3VSV4.gif', 'https://i.imgur.com/J5b4LkQ.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} 👍`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
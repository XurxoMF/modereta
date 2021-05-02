const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'sonrisa',
    description: 'Envía un gif sonriendo.',
    aliases: ['smile'],
    execute(client, message) {
      message.delete();
      let gifs = ['https://i.imgur.com/ElhMCRE.gif', 'https://i.imgur.com/7ZBnqGO.gif', 'https://i.imgur.com/YGZ7QXK.gif', 'https://i.imgur.com/uRUSPm2.gif', 'https://i.imgur.com/V5QGk7N.gif', 'https://i.imgur.com/3RZjBXk.gif', 'https://i.imgur.com/J0TtNBg.gif', 'https://i.imgur.com/Kufnmw4.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** está mostrando su mejor sonrisa**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
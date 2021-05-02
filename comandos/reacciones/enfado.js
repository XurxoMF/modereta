const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'enfado',
    description: 'Envía un gif con cara de enfado.',
    aliases: ['pout', 'enfadado'],
    execute(client, message) {
      message.delete();
      let gifs = ['https://i.imgur.com/DAfeiCa.gif', 'https://i.imgur.com/tN2ziCE.gif', 'https://i.imgur.com/rcv05my.gif', 'https://i.imgur.com/IODw7Lw.gif', 'https://i.imgur.com/4EeGHP2.gif', 'https://i.imgur.com/uiwbnW5.gif', 'https://i.imgur.com/qPWD6Ik.gif', 'https://i.imgur.com/rbqNEw3.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se ha enfado!!**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'sonrojarse',
    description: 'Envía un gif sonrojándose.',
    aliases: ['blush', 'verguenza', 'vergüenza', 'avergonzado'],
    execute(client, message) {
      let gifs = ['https://i.imgur.com/AMCTqdL.gif', 'https://i.imgur.com/o99VOes.gif', 'https://i.imgur.com/2t1tJib.gif', 'https://i.imgur.com/cr6fJeC.gif', 'https://i.imgur.com/j0ao2iP.gif', 'https://i.imgur.com/0bGRPyO.gif', 'https://i.imgur.com/acEKS2a.gif', 'https://i.imgur.com/B30sGCt.gif']
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se ha sonrojado**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
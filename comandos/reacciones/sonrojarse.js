const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'sonrojarse',
    description: 'Envía un gif sonrojándose.',
    aliases: ['blush', 'verguenza', 'vergüenza', 'avergonzado'],
    execute(client, message) {
      let gifs = ['https://i.postimg.cc/PfP7CmP4/1.gif',
        'https://i.postimg.cc/T3q7z04R/2.gif',
        'https://i.postimg.cc/vBD06sHB/3.gif',
        'https://i.postimg.cc/T3GQJmYB/4.gif',
        'https://i.postimg.cc/wxZGL7Nd/5.gif',
        'https://i.postimg.cc/6pNbbgzj/6.gif',
        'https://i.postimg.cc/VNK766wp/7.gif',
        'https://i.postimg.cc/wTNbVg5R/8.gif',
        ]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se ha sonrojado**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
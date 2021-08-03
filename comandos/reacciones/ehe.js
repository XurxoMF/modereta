const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ehe',
    description: 'Envía un gif con cara ehe. ;P',
    aliases: ['teehee'],
    execute(client, message) {
      let gifs = ['https://i.postimg.cc/vHf5KjxK/1.gif',
        'https://i.postimg.cc/9QBZm7pt/2.gif',
        'https://i.postimg.cc/SsPKQy3G/3.gif',
        'https://i.postimg.cc/RZmwxRcZ/4.gif',
        'https://i.postimg.cc/1tXtZgCt/5.gif',
        'https://i.postimg.cc/RhnZNkzx/6.gif',
        'https://i.postimg.cc/44rzBZyt/7.gif',
        'https://i.postimg.cc/dQ722Dsw/8.gif',
        ]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** ;P**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
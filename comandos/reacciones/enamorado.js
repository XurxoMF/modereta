const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'enamorado',
    description: 'Envía un gif in love.',
    aliases: ['amor', 'deredere', 'love'],
    execute(client, message, args, kfdb, acciondb) {
      let gifs = ['https://i.postimg.cc/tC4Hv0cq/1.gif',
        'https://i.postimg.cc/VkSP1q12/2.gif',
        'https://i.postimg.cc/2jwDxj29/3.gif',
        'https://i.postimg.cc/QM1LKjFb/4.gif',
        'https://i.postimg.cc/qqjHBQNH/5.gif',
        'https://i.postimg.cc/3RTsgzpH/6.gif',
        'https://i.postimg.cc/htHWGXtv/7.gif',
        'https://i.postimg.cc/02X1LWgp/8.gif',
        ]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} 😍`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
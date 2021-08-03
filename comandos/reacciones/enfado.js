const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'enfado',
    description: 'Envía un gif con cara de enfado.',
    aliases: ['pout', 'enfadado'],
    execute(client, message) {
      let gifs = ['https://i.postimg.cc/j53hs7Rk/1.gif',
        'https://i.postimg.cc/bJwTcTft/2.gif',
        'https://i.postimg.cc/qvcXNYkK/3.gif',
        'https://i.postimg.cc/L61Vp5wN/4.gif',
        'https://i.postimg.cc/T2ScFg7K/5.gif',
        'https://i.postimg.cc/Z5zxKZhZ/6.gif',
        'https://i.postimg.cc/3NPCGQ4X/7.gif',
        'https://i.postimg.cc/nrsGMhzV/8.gif',
        ]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se ha enfado!!**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'risa',
    description: 'Envía un gif riéndose.',
    aliases: ['laugh', 'reirse', 'reír', 'reir'],
    execute(client, message, args, kfdb, acciondb) {
      let gifs = ['https://i.postimg.cc/m2WGRzhr/1.gif',
        'https://i.postimg.cc/7Zx8GF38/2.gif',
        'https://i.postimg.cc/CMqVWHht/3.gif',
        'https://i.postimg.cc/jd6YjxJ4/4.gif',
        'https://i.postimg.cc/vZ3RW0h1/5.gif',
        'https://i.postimg.cc/MGFhLXhq/6.gif',
        'https://i.postimg.cc/3wRs92ft/8.gif',
        ]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se parte de risa!!**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
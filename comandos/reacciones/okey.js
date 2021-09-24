const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'okey',
    description: 'Envía un gif diciendo ok.',
    aliases: ['ok', 'thumbsup', 'thumbs'],
    execute(client, message, args, kfdb, acciondb) {
      let gifs = ['https://i.postimg.cc/Dw3RVtj4/1.gif',
        'https://i.postimg.cc/ydGrL53d/2.gif',
        'https://i.postimg.cc/Bn5kJMkY/3.gif',
        'https://i.postimg.cc/tJLw4f9f/4.gif',
        'https://i.postimg.cc/sDhbNVcR/5.gif',
        'https://i.postimg.cc/mr8nHhb7/6.gif',
        'https://i.postimg.cc/G3NZKBvQ/7.gif',
        'https://i.postimg.cc/DZ0MdFZH/8.gif',
        ]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} 👍`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
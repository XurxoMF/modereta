const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'llanto',
    description: 'Envía un gif llorando.',
    aliases: ['cry', 'llorar'],
    execute(client, message, args, kfdb, acciondb) {
      let gifs = ['https://i.postimg.cc/qqnQj7db/1.gif',
        'https://i.postimg.cc/QNW6XfWQ/2.gif',
        'https://i.postimg.cc/8zTwmDX4/3.gif',
        'https://i.postimg.cc/mDK8YHK1/4.gif',
        'https://i.postimg.cc/vHF0D5Wp/5.gif',
        'https://i.postimg.cc/bNx3ndgd/6.gif',
        'https://i.postimg.cc/wv1wRV4d/7.gif',
        'https://i.postimg.cc/rpFnMcSs/8.gif',
        ]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** está llorando **`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
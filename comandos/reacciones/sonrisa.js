const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'sonrisa',
    description: 'Envía un gif sonriendo.',
    aliases: ['smile'],
    execute(client, message, args, kfdb, acciondb) {
      let gifs = ['https://i.postimg.cc/L6jg61TQ/1.gif',
        'https://i.postimg.cc/T39ynvBr/2.gif',
        'https://i.postimg.cc/RF84wgM1/3.gif',
        'https://i.postimg.cc/HxjTJqCs/4.gif',
        'https://i.postimg.cc/MZMjN4jS/5.gif',
        'https://i.postimg.cc/x8zY5LCw/6.gif',
        'https://i.postimg.cc/zG5bLG2z/7.gif',
        'https://i.postimg.cc/xqVQ4qNc/8.gif',
        ]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** está mostrando su mejor sonrisa**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
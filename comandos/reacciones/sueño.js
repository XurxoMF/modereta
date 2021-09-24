const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'sueño',
    description: 'Envía un gif durmiendo.',
    aliases: ['sleepy', 'dormir'],
    execute(client, message, args, kfdb, acciondb) {
      let gifs = ['https://i.postimg.cc/1XvR7D1M/1.gif',
        'https://i.postimg.cc/wBNvxtDT/2.gif',
        'https://i.postimg.cc/L596VNwn/3.gif',
        'https://i.postimg.cc/mDGrPbS3/4.gif',
        'https://i.postimg.cc/vZcTj2Bn/5.gif',
        'https://i.postimg.cc/vZkTd7gN/6.gif',
        'https://i.postimg.cc/0QdymLtT/7.gif',
        'https://i.postimg.cc/qM7vhD2F/8.gif',
        ]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se está quedando dormido!!**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
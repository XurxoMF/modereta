const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nosé',
    description: 'Envía un gif encogiéndose de hombros.',
    aliases: ['shrug', 'idk', 'nose'],
    execute(client, message) {
      let gifs = ['https://i.postimg.cc/SKMXXYLv/1.gif',
        'https://i.postimg.cc/6pS25fZZ/2.gif',
        'https://i.postimg.cc/xTfbsCYX/3.gif',
        'https://i.postimg.cc/ZnT0DfGG/4.gif',
        'https://i.postimg.cc/NMvKRGpf/5.gif',
        'https://i.postimg.cc/HW4y45GG/6.gif',
        'https://i.postimg.cc/3xW0Tck7/7.gif',]
      let usersend = message.member.user
      const embed = new MessageEmbed()
      .setColor('#fc03f4')
      .setDescription(`${usersend} ** se encoge de hombros**`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)]);

      message.channel.send(embed);
    },
  };
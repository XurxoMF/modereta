module.exports = {
    name: 'nrandom',
    description: 'Envía enlace a un doujin random de nHenati.net',
    cooldown: 5,
    execute(message) {
      message.delete();
      message.channel.send('https://nhentai.net/random/').then(msg => {
        msg.delete({ timeout: 10000 });
      });
    },
  };
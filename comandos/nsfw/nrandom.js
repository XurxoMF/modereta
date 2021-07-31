module.exports = {
    name: 'nrandom',
    description: 'Envía enlace a un doujin random de nHenati.net o a un doujin en concreto.',
    usage: '[código de 6 dígitos]',
    cooldown: 10,
    execute(client, message, args) {
        if (!args.length) {
            message.delete();
            return message.channel.send('https://nhentai.net/random/').then(msg => {
              msg.delete({ timeout: 10000});
            });
        } else {
            const ncode = args[0].trim();
            message.delete();
            message.channel.send(`https://www.nhentai.net/g/${ncode}/`).then(msg =>{
              msg.delete({ timeout: 10000 });
            });
        }
    },
  };
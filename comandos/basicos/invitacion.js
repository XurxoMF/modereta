module.exports = {
    name: 'invitacion',
    description: 'Envía una invitación permanente al server.',
    cooldown: 10,
      aliases: ['invitación', 'invi'],
    execute(message) {
      message.delete();
      message.channel.send('https://discord.gg/ZvB55s4').then(msg => {
        msg.delete({ timeout: 10000 });
      });
    },
  };
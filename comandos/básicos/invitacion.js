module.exports = {
    name: 'invitacion',
    description: 'Envía una invitación permanente al server.',
    cooldown: 10,
      aliases: ['invitación', 'invi'],
    execute(client, message) {
      message.channel.send('https://discord.gg/ZvB55s4');
    },
  };
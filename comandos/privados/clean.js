const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'clean',
  description: 'Elimina mensajes de un canal.',
  aliases: ['cl'],
  priv: true,
  usage: '<número de mensajes, máximo 100>',
  execute(client, message, args, db) {
    if (message.author.id != 556249326951727115) return message.delete().then(message.channel.send('No puedes usar este comando ya que no tienes los permisos necesarios.').then(msg => {
      msg.delete({ timeout: 2000 });
    }));


    if (!args[0]) return message.delete().then(message.channel.send('Faltan argumentos!').then(msg => {
      msg.delete({ timeout: 2000 });
    }));


    let deleteAmount;

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) return message.delete().then(message.channel.send('Solo puedes usar números.').then(msg => {
      msg.delete({ timeout: 2000 });
    }));


    if (parseInt(args[0]) >= 100) {
      return message.delete().then(message.channel.send('Solo puedo borrar un máximo de 99 mensajes!').then(msg => {
        msg.delete({ timeout: 2000 });
      }));
    } else {
      deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true).then((_message) => {
      const embed = new MessageEmbed()
        .setDescription(`Se han eliminado ***${_message.size}*** mensajes con éxito.`)

      message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 2000 });
      });
    });
  },
};
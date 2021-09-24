module.exports = {
  name: 'ping',
  description: 'Ping!',
  cooldown: 5,
  execute(client, message, args, kfdb, acciondb) {
    let ping = Math.floor(message.client.ws.ping);
    message.delete();
    message.channel.send('El ping es de `' + ping + ' ms.`').then(msg => {
      msg.delete({ timeout: 10000 });
    });
  },
};
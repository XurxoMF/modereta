const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});
let port = process.env.PORT || 3000;
app.listen(port);

///////////////////////EMPIEZA/BOT//////////////////////////////

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./comandos');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./comandos/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./comandos/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.on('ready', () => {
  console.log('Preparada! UwU');
  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'todo en AstroMunidad',
      type: 'WATCHING'
    }
  });
});

client.on('message', message => {

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('Este comando solo puede ser usado en AstroMunidad.');
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply('No tienes los permisos necesarios.');
    }
  }

  if (command.args && !args.length) {
    let reply = `${message.author}, faltan argumentos!`;

    if (command.usage) {
      reply += `Es uso correcto de este comando es: \`${prefix}${command.name}\` *\`${command.usage}\`*`;
    }

    return message.channel.send(reply);
  }

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 0) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Por favor, espera **\`${timeLeft.toFixed(1)}\`** segundos más antes de usar el comando \`${command.name}\` de nuevo.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Ha ocurrido un error al ejecutar el comando, notifícanoslo en el canal de sujerencias').then(msg => {
      msg.delete({ timeout: 10000 });
    });
  }
});

client.login(token);
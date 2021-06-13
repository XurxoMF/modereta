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
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./database.sqlite");

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

  db.run('CREATE TABLE IF NOT EXISTS karutaframes (nombre TEXT, bit1 TEXT, bit2 TEXT, foto TEXT, color TEXT)', function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('karutaframes conectada desde database.sqlite');
  })

});

client.on('message', message => {

  if (message.author.id == `748161670945177641`) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();



  let messageContent = message.content.toLowerCase();



  let nocomando = [''];



  let wordskarutaview = ['kv', 'k!v'];
  let wordskarutawi = ['kwi', 'k!wi', 'kworkerinfo', 'k!workerinfo'];
  let wordskarutaviewdyes = ['kv $', 'k!v $', 'kv  $', 'k!v  $'];
  let wordsiteminfo = ['kii', 'k!ii', 'kiteminfo', 'k!iteminfo'];
  let dyechannels = ['815976854652715058', '815978239008833616', '815978326048112650', '815978402876096523', '815978511512502314', '815978638561640518', '815978751749390386', '815978956053413898', '815978913389871134', '816628785523851304', '815979234698199110', '821416773625577482', '815981553921818644'];
  let cartaschannels = ['814594761049636895', '846743034867482644', '815931846340640768', '846743084724387850', '815931883882807368', '846743131764293652'];


  //////     KARUTA     //////

  //Mod Karuta temporaly restriction.
  if ((messageContent.includes('a temporary restriction is preventing you from using that command for another')) && (message.author.id == '646937666251915264')) {
    message.delete({ timeout: 10000 });
  }

  //Mod ver cartas karuta.
  if (message.channel.id == `742859689779527800`) {
    if (wordskarutaview.some(word => messageContent.startsWith(word))) {
      message.delete();
    } else {
      if (
        !messageContent.startsWith('k') &&
        message.author.id != '646937666251915264'
      ) {
        message.delete();
        message.channel
          .send(
            'En este canal solo se pueden usar los comandos ***`kv`***, ***`kview`***, ***`k!v`*** y ***`k!view`***.'
          )
          .then(msg => {
            msg.delete({ timeout: 10000 });
          });
      } else {
        if (messageContent.startsWith('k')) {
          message.delete();
          const filter = m => m.author.id == `646937666251915264` && m.content.includes(`command is restricted in this channel`);
          message.channel
            .awaitMessages(filter, { max: 1, time: 2000, errors: ['time'] })
            .then(collected => collected.first().delete({ timeout: 5000 }))
            .catch(() => null);
        } else {
          if (
            message.author.id == `646937666251915264` &&
            messageContent.includes('that code is invalid')
          ) {
            message.delete({ timeout: 5000 });
          } else {
            if ((message.author.id == `646937666251915264`) && (!messageContent.includes(`command is restricted in this channel`)) && (!messageContent.includes(`that code is invalid`))) {
              message
                .react('🥉')
                .then(() => message.react('🥈'))
                .then(() => message.react('🥇'))
                .catch(() => null);
            }
          }
        }
      }
    }
    return;
  }

  //Mod ver effor karuta
  if (message.channel.id == `827635940276174878`) {
    if (wordskarutawi.some(word => messageContent.startsWith(word))) {
      message.delete();
    } else {
      if (
        !messageContent.startsWith('k') &&
        message.author.id != '646937666251915264'
      ) {
        message.delete();
        message.channel
          .send(
            'En este canal solo se pueden usar los comandos ***`kwi`***, ***`kworkerinfo`***, ***`k!wi`*** y ***`k!workerinfo`***.'
          )
          .then(msg => {
            msg.delete({ timeout: 10000 });
          });
      } else {
        if (messageContent.startsWith('k')) {
          message.delete();
          const filter = m => m.author.id == `646937666251915264` && m.content.includes(`command is restricted in this channel`);
          message.channel
            .awaitMessages(filter, { max: 1, time: 2000, errors: ['time'] })
            .then(collected => collected.first().delete({ timeout: 5000 }))
            .catch(() => null);
        } else {
          if (
            message.author.id == `646937666251915264` &&
            messageContent.includes('that card code is invalid')
          ) {
            message.delete({ timeout: 5000 });
          } else {
            if ((message.author.id == `646937666251915264`) && (!messageContent.includes(`command is restricted in this channel`)) && (!messageContent.includes(`that card code is invalid`))) {
              message
                .react('🥉')
                .then(() => message.react('🥈'))
                .then(() => message.react('🥇'))
                .catch(() => null);
            }
          }
        }
      }
    }
    return;
  }

  //Mod cartas-en-venta
  if (cartaschannels.some(channel => message.channel.id === channel)) {
    if (wordskarutaview.some(word => messageContent.startsWith(word))) {
    } else {
      if (
        !messageContent.startsWith('k') &&
        message.author.id != '646937666251915264'
      ) {
        message.delete();
        message.channel
          .send(
            'En este canal solo se pueden usar los comandos ***`kv`***, ***`kview`***, ***`k!v`*** y ***`k!view`***.'
          )
          .then(msg => {
            msg.delete({ timeout: 10000 });
          });
      } else {
        if (messageContent.startsWith('k')) {
          message.delete();
          const filter = m => m.author.id == `646937666251915264` && m.content.includes(`command is restricted in this channel`);
          message.channel
            .awaitMessages(filter, { max: 1, time: 2000, errors: ['time'] })
            .then(collected => collected.first().delete({ timeout: 5000 }))
            .catch(() => null);
        } else {
          if (
            message.author.id == `646937666251915264` &&
            messageContent.includes('that code is invalid')
          ) {
            message.delete({ timeout: 5000 });
          }
        }
      }
    }
    return;
  }

  //Mod venta dyes
  if (message.channel.id == `815932201740402688`) {
    if (wordskarutaviewdyes.some(word => messageContent.startsWith(word))) {
    } else {
      if (
        !messageContent.startsWith('k') &&
        message.author.id != '646937666251915264'
      ) {
        message.delete();
        message.channel
          .send(
            'En este canal solo se pueden usar los comandos ***`kv`***, ***`kview`***, ***`k!v`*** y ***`k!view`*** para mostrar ***`DYES`***.'
          )
          .then(msg => {
            msg.delete({ timeout: 10000 });
          });
      } else {
        if (messageContent.startsWith('k')) {
          message.delete();
          const filter = m => m.author.id == `646937666251915264` && m.content.includes(`command is restricted in this channel`);
          message.channel
            .awaitMessages(filter, { max: 1, time: 2000, errors: ['time'] })
            .then(collected => collected.first().delete())
            .catch(() => null);
        } else {
          if (
            message.author.id == `646937666251915264` &&
            messageContent.includes('that code is invalid')
          ) {
            message.delete({ timeout: 5000 });
          }
        }
      }
    }
    return;
  }

  //Mod cartas-gratis
  if (message.channel.id == `815932343759142962`) {
    if (wordskarutaview.some(word => messageContent.startsWith(word))) {
    } else {
      if (
        !messageContent.startsWith('k') &&
        message.author.id != '646937666251915264'
      ) {
        message.delete();
        message.channel
          .send(
            'En este canal solo se pueden usar los comandos ***`kv`***, ***`kview`***, ***`k!v`*** y ***`k!view`***.'
          )
          .then(msg => {
            msg.delete({ timeout: 10000 });
          });
      } else {
        if (messageContent.startsWith('k')) {
          message.delete();
          const filter = m => m.author.id == `646937666251915264` && m.content.includes(`command is restricted in this channel`);
          message.channel
            .awaitMessages(filter, { max: 1, time: 2000, errors: ['time'] })
            .then(collected => collected.first().delete())
            .catch(() => null);
        } else {
          if (
            message.author.id == `646937666251915264` &&
            messageContent.includes('that code is invalid')
          ) {
            message.delete({ timeout: 5000 });
          }
        }
      }
    }
    return;
  }

  //Reaccións recomendar música.
  if (message.channel.id == '726155485236953088') {
    if (message.content.includes('https://www.youtube.com/watch')) {
      message
        .react('👎')
        .then(() => message.react('👍'))
        .catch(() => null);
    } else {
      if (message.content.includes('https://youtu.be/')) {
        message
          .react('👎')
          .then(() => message.react('👍'))
          .catch(() => null);
      } else {
        if (message.content.includes('https://soundcloud.com/')) {
          message
            .react('👎')
            .then(() => message.react('👍'))
            .catch(() => null);
        } else {
          if (message.content.includes('https://music.youtube.com/watch')) {
            message
              .react('👎')
              .then(() => message.react('👍'))
              .catch(() => null);
          }
        }
      }
    }
    return;
  }

  //////     KARUTA     //////




  //////     MODS DYES     //////

  if (dyechannels.some(channel => message.channel.id === channel)) {
    if (wordskarutaviewdyes.some(word => messageContent.startsWith(word))) {
      message.delete();
    } else {
      if (
        !messageContent.startsWith('k') &&
        message.author.id != '646937666251915264'
      ) {
        message.delete();
        message.channel
          .send(
            'En este canal solo se pueden usar los comandos ***`kv`***, ***`kview`***, ***`k!v`*** y ***`k!view`*** para mostrar ***`DYES`***.'
          )
          .then(msg => {
            msg.delete({ timeout: 10000 });
          });
      } else {
        if (
          message.author.id == `646937666251915264` &&
          messageContent.includes('that code is invalid')
        ) {
          message.delete({ timeout: 5000 });
        } else {
          if (messageContent.startsWith('k')) {
            message.delete();
            message.channel
              .send(
                'En este canal solo se pueden usar los comandos ***`kv`***, ***`kview`***, ***`k!v`*** y ***`k!view`*** para mostrar ***`DYES`***.'
              )
              .then(msg => {
                msg.delete({ timeout: 10000 });
              });
            const filter = m => m.author.id == `646937666251915264` && !m.content.includes(`that code is invalid`) && m.content.includes(`command is restricted in this channel`);
            message.channel
              .awaitMessages(filter, { max: 1, time: 2000, errors: ['time'] })
              .then(collected => collected.first().delete())
              .catch(() => null);
          }
        }
      }
    }
    return;
  }

  //////     MODS DYES     //////

















  if (!message.content.startsWith(prefix)) return;

  if (nocomando.some(nocom => message.channel.id === nocom)) {
    message.delete()
    message.reply('En este canal no se pueden usar comandos.').then(msg => {
      msg.delete({ timeout: 10000 });
    });
    return;
  }

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('Este comando solo puede ser usado en AstroMunidad.');
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      message.delete({ timeout: 10000 });
      return message.reply('No tienes los permisos necesarios.').then(msg => {
        msg.delete({ timeout: 10000 });
      });
    }
  }

  if (command.args && !args.length) {
    message.delete({ timeout: 10000 });
    let reply = `${message.author}, faltan argumentos!`

    if (command.usage) {
      reply += `Es uso correcto de este comando es: \`${prefix}${command.name}\` *\`${command.usage}\`*`;
    }

    return message.channel.send(reply).then(msg => {
      msg.delete({ timeout: 10000 });
    });
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
      message.delete();
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Por favor, espera **\`${timeLeft.toFixed(1)}\`** segundos más antes de usar el comando \`${command.name}\` de nuevo.`).then(msg => {
        msg.delete({ timeout: 10000 });
      });
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(client, message, args, db);
  } catch (error) {
    console.error(error);
    message.delete({ timeout: 10000 });
    message.reply('Ha ocurrido un error al ejecutar el comando, notifícanoslo en el canal de sugerencias').then(msg => {
      msg.delete({ timeout: 10000 });
    });
  }
});

client.login(token);
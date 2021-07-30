const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix } = require('../../config.json');

module.exports = {
  name: 'help',
  description: 'Lista todos lso comandos o muestra información sobre un comando en concreto.',
  aliases: ['ayuda', 'comandos', 'info'],
  usage: '[comando]',
  cooldown: 5,
  execute(client, message, args) {

    if (!args[0]) {
      let categories = [];

      readdirSync("./comandos/").filter(c =>
        !['privados'].includes(c)).forEach((dir) => {
          const commands = readdirSync(`./comandos/${dir}/`).filter((file) =>
            file.endsWith(".js")
          );

          const cmds = commands.map((command) => {
            let file = require(`../../comandos/${dir}/${command}`);

            if (!file.name) return "No hay ningún comando con ese nombre.";

            let name = file.name.replace(".js", "");

            return `\`${name}\``;
          });

          let data = new Object();

          data = {
            name: dir.toUpperCase(),
            value: cmds.length === 0 ? "Procesando..." : cmds.join(", "),
          };

          categories.push(data);
        });

      const embed = new MessageEmbed()
        .setTitle("Lista de comandos:")
        .addFields(categories)
        .setDescription(
          `Si quieres ver como se usa un comando en concreto usa \`${prefix}help\` seguido del comando que necesites. Ejemplo: \`${prefix}help ping\`.`
        )
        .setColor('#fc03f4');
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`No existe ese comando! Puedes usar \`${prefix}help\` para ver los comandos disponibles.`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      if ((command.priv) && (message.author.id != '556249326951727115')) {
        return message.channel.send('No tienes permisos para ver o usar este comando.');
      }

      const embed = new MessageEmbed()
        .setTitle("Información del comando:")
        .addField(
          "COMANDO:",
          command.name ? `\`${prefix}${command.name}\`` : "Comando sin nombre."
        )
        .addField(
          "ALIAS:",
          command.aliases
            ? `\`${command.aliases.join("`, `")}\``
            : "Este comando no tiene alias."
        )
        .addField(
          "USO:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPCIÓN:",
          command.description
            ? command.description
            : "Este comando no tiene descripción."
        )
        .setFooter('*Los parámetros entre [] son opcionales y los parámetros entre <> son obligatorios.*')
        .setColor('#fc03f4');
      return message.channel.send(embed);
    }
  },
};
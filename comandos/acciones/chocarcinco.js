const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "chocarcinco",
  description: "Le chocas los cinco a la persona a la que mencionas.",
  aliases: ["chocarloscinco", "highfive", "chocar5"],
  usage: "<@usuario>",
  async execute(client, message, args, kfdb, acciondb) {
    let useract = message.mentions.users.first();

    if (!useract) return message.channel.send(`No has mencionado a nadie.`);

    let gifs = [
      "https://i.postimg.cc/d3YXB5Bb/1.gif",
      "https://i.postimg.cc/h4LNjq4c/2.gif",
      "https://i.postimg.cc/3J96XCDq/3.gif",
      "https://i.postimg.cc/PxZ9Ygmb/4.gif",
      "https://i.postimg.cc/C5s26brz/5.gif",
      "https://i.postimg.cc/28CMLX3v/6.gif",
      "https://i.postimg.cc/4xd0B76x/7.gif",
      "https://i.postimg.cc/3w0cQsbM/8.gif",
    ];
    let usersend = message.member.user;
    let useractname =
      message.mentions.members.first().nickname ||
      message.mentions.users.first().username;
    let nameacction = this.name;

    if (useract.id === usersend.id)
      return message.channel.send(
        "Se choca los cinco a si mismo, que solo se ha quedado..."
      );

    let useractid = useract.id;

    const filas = await acciondb
      .findOne({
        $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }],
      })
      .exec();

    if (!filas) {
      await acciondb
        .create({
          usuario: `${useractid}`,
          accion: `${nameacction}`,
          cant: "1",
        })
        .then((c) => {
          const embed = new MessageEmbed()
            .setColor("#a30584")
            .setDescription(
              `${usersend} le está chocando choca los cinco a ${useract}.)`
            )
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setFooter(`A ${useractname} le han chocado los cinco 1 vez.`);
          message.channel.send(embed);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      let sumar = filas.cant + 1;

      await acciondb.updateOne(
        { $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] },
        { cant: `${sumar}` }
      );

      const embed = new MessageEmbed()
        .setColor("#a30584")
        .setDescription(`${usersend} le está chocando los cinco a ${useract}.`)
        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
        .setFooter(`A ${useractname} le han chocado los cinco ${sumar} veces.`);
      message.channel.send(embed);
    }
  },
};

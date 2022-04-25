const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "abrazo",
  description: "Le das un abrazo a la persona a la que menciones.",
  aliases: ["abrazar", "hug"],
  usage: "<@usuario>",
  async execute(client, message, args, kfdb, acciondb) {
    let useract = message.mentions.users.first();

    if (!useract) return message.channel.send(`No has mencionado a nadie.`);

    let gifs = [
      "https://i.postimg.cc/PrpPmNBm/1.gif",
      "https://i.postimg.cc/vTp8PLp5/2.gif",
      "https://i.postimg.cc/76ZLbL3J/3.gif",
      "https://i.postimg.cc/PfcqrTPN/4.gif",
      "https://i.postimg.cc/hjZtmqsy/5.gif",
      "https://i.postimg.cc/L8j5bw45/6.gif",
      "https://i.postimg.cc/C5ZLH66F/7.gif",
      "https://i.postimg.cc/BQrtN40R/8.gif",
    ];
    let usersend = message.member.user;
    let useractname =
      message.mentions.members.first().nickname ||
      message.mentions.users.first().username;
    let nameacction = this.name;

    if (useract.id === usersend.id)
      return message.channel.send(
        "Si quieres un abrazo solo pídelo, pero no te abrazes a ti mismo que es complicado >_<"
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
            .setDescription(`${usersend} le ha dado un abrazo a ${useract} >_<`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setFooter(`${useractname} ha recibido 1 abrazo.`);
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
        .setDescription(`${usersend} le ha dado un abrazo a ${useract} >_<`)
        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
        .setFooter(`${useractname} ha recibido ${sumar} abrazos.`);
      message.channel.send(embed);
    }
  },
};

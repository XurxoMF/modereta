const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "puñetazo",
  description: "Le pegas a la persona a la que menciones.",
  aliases: ["golpear", "slap", "punch"],
  usage: "<@usuario>",
  async execute(client, message, args, kfdb, acciondb) {
    let useract = message.mentions.users.first();

    if (!useract) return message.channel.send(`No has mencionado a nadie.`);

    let gifs = [
      "https://i.postimg.cc/QdSVpPXT/1.gif",
      "https://i.postimg.cc/bJZGYTf2/2.gif",
      "https://i.postimg.cc/nhnC9Ztx/3.gif",
      "https://i.postimg.cc/rwywFJSF/4.gif",
      "https://i.postimg.cc/6343xpCr/5.gif",
      "https://i.postimg.cc/KvSKFBqR/6.gif",
      "https://i.postimg.cc/RC3fvMvb/7.gif",
      "https://i.postimg.cc/hGyzqY6B/8.gif",
    ];
    let usersend = message.member.user;
    let useractname =
      message.mentions.members.first().nickname ||
      message.mentions.users.first().username;
    let nameacction = this.name;

    if (useract.id === usersend.id)
      return message.channel.send(
        "Noooo, no te pegues a ti mismo, que haces?? X_X"
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
            .setDescription(`${usersend} acaba de golpear a ${useract} X_X`)
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setFooter(`${useractname} ha recibido 1 puñetazo.`);
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
        .setDescription(`${usersend} acaba de golpear a ${useract} X_X`)
        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
        .setFooter(`${useractname} ha recibido ${sumar} puñetazos.`);
      message.channel.send(embed);
    }
  },
};

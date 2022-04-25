const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "pinchar",
  description: "Pinchas con el dedo a la persona a la que mencionas.",
  aliases: ["poke"],
  usage: "<@usuario>",
  async execute(client, message, args, kfdb, acciondb) {
    let useract = message.mentions.users.first();

    if (!useract) return message.channel.send(`No has mencionado a nadie.`);

    let gifs = [
      "https://i.postimg.cc/Nf73Fv4R/1.gif",
      "https://i.postimg.cc/X7bMnYwV/2.gif",
      "https://i.postimg.cc/Qdfvggvt/3.gif",
      "https://i.postimg.cc/0ykLJXWF/4.gif",
      "https://i.postimg.cc/Pqcc9XXn/5.gif",
      "https://i.postimg.cc/g0rQgXPK/6.gif",
      "https://i.postimg.cc/tTxfHKJZ/8.gif",
    ];
    let usersend = message.member.user;
    let useractname =
      message.mentions.members.first().nickname ||
      message.mentions.users.first().username;
    let nameacction = this.name;

    if (useract.id === usersend.id)
      return message.channel.send(
        "Creo que no es buena idea que te pinches a ti mismo."
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
              `${usersend} está pinchando a ${useract} sin piedad.)`
            )
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setFooter(`${useractname} ha recibido 1 poke.`);
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
        .setDescription(`${usersend} está pinchando a ${useract} sin piedad.`)
        .setImage(gifs[Math.floor(Math.random() * gifs.length)])
        .setFooter(`${useractname} ha recibido ${sumar} pokes.`);
      message.channel.send(embed);
    }
  },
};

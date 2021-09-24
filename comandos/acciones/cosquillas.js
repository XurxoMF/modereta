const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'cosquillas',
    description: 'Le haces cosquillas la persona a la que menciones.',
    aliases: ['tickle'],
    usage: '<@usuario>',
    async execute(client, message, args, kfdb, acciondb) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.postimg.cc/RhhtjBXK/2.gif',
            'https://i.postimg.cc/hGndKx2S/3.gif',
            'https://i.postimg.cc/7Pt0S5ZV/5.gif',
            'https://i.postimg.cc/br5nPBBM/6.gif',
            'https://i.postimg.cc/wTSNbnJR/7.gif',
            'https://i.postimg.cc/52Lzcpq7/8.gif',
        ];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Cosquillas a uno mismo?? Que raro, no es mejor a otra persona??')

        let useractid = useract.id;

        const filas = await acciondb.findOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }).exec();

        if (!filas) {

            await acciondb.create({ usuario: `${useractid}`, accion: `${nameacction}`, cant: '1' }).then((c) => {
                const embed = new MessageEmbed()
                    .setColor('#a30584')
                    .setDescription(`${usersend} le está haciendo cosquillas a ${useract}.`)
                    .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                    .setFooter(`A ${useractname} le han hecho cosquillas 1 vez.`);
                message.channel.send(embed);
            }).catch(err => {
                console.log(err.message);
            });

        } else {

            let sumar = filas.cant + 1;

            await acciondb.updateOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }, { cant: `${sumar}` });

            const embed = new MessageEmbed()
                .setColor('#a30584')
                .setDescription(`${usersend} le está haciendo cosquillas a ${useract}.`)
                .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                .setFooter(`A ${useractname} le han hecho cosquillas ${sumar} veces.`);
            message.channel.send(embed);
        }
    },
};
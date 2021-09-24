const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'caricias',
    description: 'Acaricias a la persona a la que mencionas.',
    aliases: ['acariciar', 'pat'],
    usage: '<@usuario>',
    async execute(client, message, args, kfdb, acciondb) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.postimg.cc/9fxFsqSg/1.gif',
            'https://i.postimg.cc/909m4gfs/2.gif',
            'https://i.postimg.cc/Px9f5ndm/3.gif',
            'https://i.postimg.cc/kXxMqHzb/4.gif',
            'https://i.postimg.cc/g2H0q7KW/5.gif',
            'https://i.postimg.cc/Z54bRczD/6.gif',
            'https://i.postimg.cc/W3hbV1cN/7.gif',
            'https://i.postimg.cc/59QNkymp/8.gif',
        ];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Estás falto de cariño?? Que alguien le de unas caricias!! :)')

        let useractid = useract.id;

        const filas = await acciondb.findOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }).exec();

        if (!filas) {

            await acciondb.create({ usuario: `${useractid}`, accion: `${nameacction}`, cant: '1' }).then((c) => {
                const embed = new MessageEmbed()
                    .setColor('#a30584')
                    .setDescription(`${usersend} está acariciando a ${useract}, que kawaii.`)
                    .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                    .setFooter(`${useractname} ha recibido 1 caricia.`);
                message.channel.send(embed);
            }).catch(err => {
                console.log(err.message);
            });

        } else {

            let sumar = filas.cant + 1;

            await acciondb.updateOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }, { cant: `${sumar}` });

            const embed = new MessageEmbed()
                .setColor('#a30584')
                .setDescription(`${usersend} está acariciando a ${useract}, que kawaii.`)
                .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                .setFooter(`${useractname} ha recibido ${sumar} caricias.`);
            message.channel.send(embed);
        }
    },
};
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'beso',
    description: 'Le das un beso a la persona a la que meciones.',
    aliases: ['besar', 'kiss'],
    usage: '<@usuario>',
    async execute(client, message, args, kfdb, acciondb) {
        let useract = message.mentions.users.first();

        if (!useract) return message.channel.send(`No has mencionado a nadie.`);

        let gifs = ['https://i.postimg.cc/Vsp0djdq/1.gif',
            'https://i.postimg.cc/K8yK5x74/2.gif',
            'https://i.postimg.cc/QdkF4wSm/3.gif',
            'https://i.postimg.cc/Y9SLmR63/4.gif',
            'https://i.postimg.cc/rF40WKrv/6.gif',
            'https://i.postimg.cc/br7ZWjKC/7.gif',
            'https://i.postimg.cc/3Rb4jG9H/8.gif',
        ];
        let usersend = message.member.user;
        let useractname = message.mentions.members.first().nickname || message.mentions.users.first().username;
        let nameacction = this.name;

        if (useract.id === usersend.id) return message.channel.send('Es un poco difícil que te beses a ti mismo no crees?')

        let useractid = useract.id;

        const filas = await acciondb.findOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }).exec();

        if (!filas) {

            await acciondb.create({ usuario: `${useractid}`, accion: `${nameacction}`, cant: '1' }).then((c) => {
                const embed = new MessageEmbed()
                    .setColor('#a30584')
                    .setDescription(`${usersend} le ha dado un beso a ${useract}`)
                    .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                    .setFooter(`${useractname} ha recibido 1 beso.`);
                message.channel.send(embed);
            }).catch(err => {
                console.log(err.message);
            });

        } else {

            let sumar = filas.cant + 1;

            await acciondb.updateOne({ $and: [{ usuario: `${useractid}` }, { accion: `${nameacction}` }] }, { cant: `${sumar}` });

            const embed = new MessageEmbed()
                .setColor('#a30584')
                .setDescription(`${usersend} le ha dado un beso a ${useract}`)
                .setImage(gifs[Math.floor(Math.random() * gifs.length)])
                .setFooter(`${useractname} ha recibido ${sumar} besos.`);
            message.channel.send(embed);
        }
    },
};
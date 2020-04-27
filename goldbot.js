const Discord = require("discord.js")
const client = new Discord.Client()
const cpuStat = require("cpu-stat");
const os = require('os')
const moment = require("moment")

client.login("NzA0MzkxMjg3ODM0NTQyMTUx.XqcdkA.fKxonUMI2u2EsOan7YkXrolLgVw")

let prefix = "!!"

client.on('ready', function () {
    console.log("GoldsFactory est en ligne !")
})

client.on('ready', function () {
    client.user.setGame('GoldsFactory V1')
})

client.on(`guildMemberAdd`, member => {
    let embed = new Discord.RichEmbed()
        .setDescription(':clap:** | ' + member.user.username + '** viens de rejoindre notre discord '+ member.guild.name)
        .setFooter('Nous sommes désormais '+ member.guild.memberCount +' Goldiens')
    member.guild.channels.get('704425096550285443').sendMessage(embed)
});

client.on(`guildMemberRemove`, member => {
    let embed = new Discord.RichEmbed()
        .setDescription(':clap:** | ' + member.user.username +'** viens de nous quitté ! Courage à lui')
        .setFooter('Nous sommes désormais '+ member.guild.memberCount +' Goldiens')
    member.guild.channels.get('704425096550285443').sendMessage(embed)
});

client.on('message', function(message) {
    
    let args = message.content.trim().split(/ +/g)
    if (!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;

      if(message.content === prefix + "ping"){
        let début = Date.now();
        message.channel.send('.').then(async(m) => (m.edit(`[GoldsFactory] » **${Date.now() - début} ms**`)))
    };

      if (message.content.startsWith(prefix + 'ban')) {
          let args = message.content.split(" ").slice(1)
          let bUser = message.guild.member(message.mentions.users.first());
          if (!bUser) return message.channel.send("Je ne trouve aucun joueurs avec ce pseudo !");
          let bReason = args.join(" ").slice(22);
          if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !");
          if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ce joueur ne peut pas être expulsé ou être banni du discord !")

          let banEmbed = new Discord.RichEmbed()
              .setTitle("__**Golds-Sanctions**__")
              .setThumbnail(bUser.user.displayAvatarURL)
              .setColor("#87f500")
              .addField('Modérateurs:', message.author.tag)
              .addField('Joueurs Banni:', bUser.user.tag)
              .addField('Raison:', bReason)
            let Banchannel = message.guild.channels.find(`name`, "logs-bots");
            if (!Banchannel) return message.channel.send("Je ne trouve pas le channel `logs-bots` si il n'existe pas merci de bien vouloir le créer !")
            
      message.guild.member(bUser).ban(bReason);
      return Banchannel.send(banEmbed);
      }

      if (message.content.startsWith(prefix + 'kick')) {
        let args = message.content.split(" ").slice(1)
            let kickUser = message.guild.member(message.mentions.users.first());
            if(!kickUser) return message.channel.send("Je ne trouve aucun joueurs avec ce pseudo !");
            let KickReason = args.join(" ").slice(22);
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !");
            if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ce joueur ne peut pas être expulsé ou être banni du discord !");
         
            let KickEmbed = new Discord.RichEmbed()
                .setTitle("__**Golds-Sanctions**__")
                .setThumbnail(kickUser.user.displayAvatarURL)
                .setColor("#bc0000")
                .addField('Modérateurs:', message.author.tag)
                .addField('Pseudo:', kickUser.user.tag)
                .addField('Raison:', KickReason)
         
            let KickChannel = message.guild.channels.find(`name`, "logs-bots")
            if (!KickChannel) return message.channel.send("Je ne trouve pas le channel `logs-bots` si il n'existe pas merci de bien vouloir le créer.")
         
            message.guild.member(kickUser).kick(KickReason)
            return KickChannel.send(KickEmbed); 
        }

        if (message.content === prefix + 'userinfo') {
            var embed = new Discord.RichEmbed()
                .setDescription("__**Informations du serveur discord**__")
                .addField("Nom du discord", message.guild.name)
                .addField("Crée le", message.guild.createdAt)
                .addField("Tu as rejoins le", message.member.joinedAt)
                .addField("Utilisateurs sur le discord", message.guild.memberCount)
                .setColor("#ff6f00")
            message.channel.sendEmbed(embed)
        }

        if(message.content === prefix + "botinfos"){
            let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setColor("RANDOM")
            .setTitle("**» GoldsFactory - BotInformations**")
            .setDescription(":crown: **Créateur →**\n- <@!365853988165386240> (`WarnomFR#8392` )")
            .addField("**:newspaper: Informations →**", "- ID → 694258257740431512\n- Language → Français | FR | French\n- Création → 2/11/2019 à 23:30\n- Préfixe → ? (Point d'interrogation)")
            .addField("**:bar_chart: Statistiques →**", `- Serveurs → ${client.guilds.size}\n- Utilisateurs → ${client.users.size}\n- Channel → ${client.channels.size}`)
            .setTimestamp()
            message.channel.send(embed)
        }

        if (args[0].toLowerCase() === prefix + "quest") {
            if (!args[1]) return message.channel.send(":x: Veuillez **poser une question**")
            let sosi = ["Tu me veux quoi fils de pute?", "Gros batard de mes deux", "Oh gros j'vais te dox"]
            let question = args.slice(1).join(" ")
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setColor("RANDOM")
                .addField("Questions :", question)
                .addField("Réponses :", sosi[Math.floor(Math.random() * sosi.length)])
            message.channel.send(embed)
        };

        if(message.content === prefix + 'roulette') {

            try{
            let answers = ["et 1 a été séléctioné", "et 2 a été séléctioné", "et 3 a été séléctioné", "et 4 a été séléctioné", "et 5 a été séléctioné", "et 6 a été séléctioné", "et 7 a été séléctioné", "et 8 a été séléctioné", "et 9 a été séléctioné", "et 10 a été séléctioné"]
            let embed = new Discord.RichEmbed()
    
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setColor("0xff0000")
            .addField("la roulette tourne :", answers[Math.floor(Math.random() * answers.length)])
            .setTimestamp()
            message.channel.send(embed)
            }
            catch(e) {
                message.reply(":x: Il y a une erreurs")
            }
    
        };

        if(message.content === prefix + "infos") {
            var infos_embed = new Discord.RichEmbed()
            .setColor('#bbff00')
            .setTitle("» GoldsFactory - Infos")
            .addField("Etat du serveur :", "Gold-Bots Activer")
            .addField("Developper :", "WarnomFR#8392")
            .setFooter("© GoldsFactory - Discord")
            message.channel.send(infos_embed);
        }

        if(message.content === prefix  + "help") {
            var help_embed = new Discord.RichEmbed()
            .setColor("#6dfffb")
            .setTitle("Récapitulatif des commandes d'aide :")
            .addField("• !!jeux", "Affiche les jeux du bots")
            .addField("• !!staff", "Affiche les commandes du staff")
            .addField("• !!bots", "Affiches les informations du bots")
            .setFooter("© GoldsFactory - Discord")
        message.channel.send(help_embed);
        }

        if (args[0].toLowerCase() === prefix + "purge") {
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
            let count = parseInt(args[1])
            if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
            if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
            if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
            message.channel.bulkDelete(count + 1, true)
        }

        if(message.content === prefix + "staff") {
            var mod_embed = new Discord.RichEmbed()
            .setColor("#054cf2")
            .setTitle('Récapitulatif des commandes de modération:')
            .addField("• !!kick <@user> <raison>", "Exclure l'utilisateurs mentionné.")
            .addField("• !!ban <@user> <raison>", "Bannir l'utilisateurs mentionné.")
            .addField("• !!botinfos", "Affiche les informations du bot.")
            .addField("• !!userinfo", "Affiche les informations de l'utilisateurs.")
            .addField("• !!infos", "Affiche l'activité du bot.")
            .setFooter("© GoldsFactory - Discord")
            message.channel.send(mod_embed);
        }

        if(message.content === prefix + "jeux") {
           var embed = new Discord.RichEmbed()
           .setColor("#054cf2") 
           .setTitle("Liste des jeux proposé:")
           .addField("• !!roulette", "Nombre aléatoire de 1 à 10.")
           .addField("• !!question", "Repond aux questions du joueurs.")
           .setFooter("© GoldsFactory - Discord")
           message.channel.send(embed);
        }

        if(message.content === prefix + "version") {
            var version_embed = new Discord.RichEmbed()
            .setColor('#05f2af')
            .setTitle("Informations :")
            .addField("Version du bot :", "1.0.0")
            .addField("Auteur :", "WarnomFR")
            .addField("Description :", "Le bot à été fait par le créateurs !")
            .setFooter("© GoldsFactory - Discord")
            message.channel.send(version_embed);
        }
})
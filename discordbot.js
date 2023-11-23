const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  // Vérifier que le message provient d'un utilisateur et n'est pas un message du bot lui-même
  if (message.author.bot) return;
  
  // Vérifier si la commande est !rouletteinverse
  if (message.content.toLowerCase() === '!rouletteinverse') {
    // Générer un chiffre aléatoire entre 1 et 6
    const nombreAleatoire = Math.floor(Math.random() * 6) + 1;

    // Envoyer un message pour demander au joueur de choisir un chiffre
    message.channel.send('Choisissez un chiffre entre 1 et 6 : ');

    // Créer un filtre pour écouter la réponse de l'utilisateur
    const filter = (response) => {
      const choixUtilisateur = parseInt(response.content);
      return !isNaN(choixUtilisateur) && choixUtilisateur >= 1 && choixUtilisateur <= 6;
    };

    // Créer un collecteur de messages
    const collector = message.channel.createMessageCollector(filter, { time: 30000 }); // Le collecteur se ferme après 30 secondes

    // Réagir lorsque le joueur fait un choix
    collector.on('collect', (response) => {
      const choixUtilisateur = parseInt(response.content);

      // Vérifier si le choix de l'utilisateur est correct
      if (choixUtilisateur === nombreAleatoire) {
        message.channel.send(`Le chiffre généré était : ${nombreAleatoire}\nFélicitations ! Vous avez gagné !`);
      } else {
        message.channel.send(`Le chiffre généré était : ${nombreAleatoire}\nDésolé, vous avez perdu. Essayez encore !`);
      }

      // Arrêter le collecteur
      collector.stop();
    });

    // Réagir en cas d'expiration du collecteur
    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        message.channel.send('Le temps pour choisir un chiffre est écoulé. Le jeu est terminé.');
      }
    });
  }
});

// Remplacez 'YOUR_BOT_TOKEN' par le véritable jeton de votre bot Discord
client.login('YOUR_BOT_TOKEN');

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const pets = new Map();
const petIntervals = new Map();

const startStatusDeterioration = (userId: string) => {
  const interval = setInterval(() => {
    const pet = pets.get(userId);
    if (pet) {
      if (pet.hunger < 100) pet.hunger += 5;
      if (pet.happiness > 0) pet.happiness -= 2;
      if (pet.health > 0) pet.health -= 1;
    }
  }, 60000);

  petIntervals.set(userId, interval);
};

const petTypes = {
  cat: { name: 'Fluffy', type: 'Cat', happiness: 50, hunger: 50, health: 100 },
  dog: { name: 'Buddy', type: 'Dog', happiness: 60, hunger: 40, health: 90 },
  bird: { name: 'Tweetie', type: 'Bird', happiness: 40, hunger: 60, health: 80 },
  rabbit: { name: 'Bunny', type: 'Rabbit', happiness: 70, hunger: 30, health: 85 }
};

export default {
  data: new SlashCommandBuilder()
    .setName('pet')
    .setDescription('Interact with your virtual pet')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('adopt')
        .setDescription('Adopt a new virtual pet')
        .addStringOption((option) =>
          option
            .setName('type')
            .setDescription('Choose the type of pet to adopt')
            .setRequired(true)
            .addChoices(
              { name: 'Cat', value: 'cat' },
              { name: 'Dog', value: 'dog' },
              { name: 'Bird', value: 'bird' },
              { name: 'Rabbit', value: 'rabbit' }
            )
        )
    )
    .addSubcommand((subcommand) => subcommand.setName('feed').setDescription('Feed your pet'))
    .addSubcommand((subcommand) => subcommand.setName('play').setDescription('Play with your pet'))
    .addSubcommand((subcommand) => subcommand.setName('train').setDescription('Train your pet'))
    .addSubcommand((subcommand) => subcommand.setName('status').setDescription("Check your pet's status")),

  async execute(interaction: any) {
    const userId = interaction.user.id;
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'adopt': {
        if (pets.has(userId)) {
          await interaction.reply('You already have a pet!');
          return;
        }

        const petType = interaction.options.getString('type');
        const newPet = petTypes[petType];

        if (!newPet) {
          await interaction.reply('Invalid pet type!');
          return;
        }

        pets.set(userId, newPet);

        startStatusDeterioration(userId);

        await interaction.reply(`You have adopted a new ${newPet.type}: ${newPet.name}!`);
        break;
      }

      case 'feed': {
        if (!pets.has(userId)) {
          await interaction.reply("You don't have a pet to feed!");
          return;
        }

        const pet = pets.get(userId);
        pet.happiness = Math.min(pet.happiness + 10, 100);
        pet.hunger = Math.max(pet.hunger - 10, 0);
        await interaction.reply(`${pet.name} has been fed! Happiness: ${pet.happiness}, Hunger: ${pet.hunger}`);
        break;
      }

      case 'play': {
        if (!pets.has(userId)) {
          await interaction.reply("You don't have a pet to play with!");
          return;
        }

        const pet = pets.get(userId);
        pet.happiness = Math.min(pet.happiness + 10, 100);
        await interaction.reply(`${pet.name} had fun playing! Happiness: ${pet.happiness}`);
        break;
      }

      case 'train': {
        if (!pets.has(userId)) {
          await interaction.reply("You don't have a pet to train!");
          return;
        }

        const pet = pets.get(userId);
        pet.health = Math.min(pet.health + 10, 100);
        await interaction.reply(`${pet.name} is looking healthier after training! Health: ${pet.health}`);
        break;
      }

      case 'status': {
        if (!pets.has(userId)) {
          await interaction.reply("You don't have a pet!");
          return;
        }

        const pet = pets.get(userId);

        const petStatusEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle(`${pet.name}'s Status`)
          .setDescription(`Here is the current status of your ${pet.type.toLowerCase()}!`)
          .addFields(
            { name: 'Happiness', value: `${pet.happiness}`, inline: true },
            { name: 'Hunger', value: `${pet.hunger}`, inline: true },
            { name: 'Health', value: `${pet.health}`, inline: true }
          );

        await interaction.reply({ embeds: [petStatusEmbed] });
        break;
      }

      default:
        await interaction.reply('Unknown command!');
    }
  }
};

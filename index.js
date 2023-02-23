const { Client, Intents } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  // Refresh slash commands on bot startup
  await client.application.commands.fetch();
  await client.guilds.cache.get('YOUR_GUILD_ID').commands.set([
    {
      name: 'chat',
      description: 'Chat with ChatGPT',
      options: [
        {
          name: 'input',
          description: 'The prompt to send to ChatGPT',
          type: 'STRING',
          required: true,
        },
      ],
    },
  ]);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.commandName === 'chat') {
    const input = interaction.options.getString('input');
    const channel = interaction.channel;
    const startMessage = await channel.send('Initializing chat...');

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: input,
      });
      
      const answer = response.data.choices[0].text.trim();
      const thread = await channel.threads.create({
        name: `Chat with ${interaction.user.tag}`,
        autoArchiveDuration: 60,
        startMessage: startMessage,
      });

      await thread.send(`Q: ${input}\nA: ${answer}`);
    } catch (err) {
      console.error(err);
      await startMessage.edit('Oops! Something went wrong while trying to get an answer. Please try again later.');
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  const channel = message.channel;
  const input = message.content;
  
  try {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: input,
      });
    
    const answer = response.data.choices[0].text.trim();
    await channel.send(`Q: ${input}\nA: ${answer}`);
  } catch (err) {
    console.error(err);
    await message.reply('Oops! Something went wrong while trying to get an answer. Please try again later.');
  }
});

client.login(process.env.TOKEN);

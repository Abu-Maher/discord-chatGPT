# discord-chatGPT
In this code will allows to you chatting with ChatGPT by using your own discord bot.
![discord-imagepreview](https://cdn.discordapp.com/attachments/704175215818571856/1078242578853539840/image.png)
![discord-imagepreview2](https://cdn.discordapp.com/attachments/704175215818571856/1078242578614452234/image.png)
## How to use

1. Clone the repository or download the files.
2. Install the dependencies by running `npm install`.
3. Create a `.env` file and add your Discord bot token and OpenAI API key in the following format:
`DISCORD_TOKEN=your_discord_bot_token_here`
`OPENAI_API_KEY=your_openai_api_key_here`
4. Start the bot by running `node index.js`.

## Features
- Chat with ChatGPT through slash commands or regular messages.
- Automatically creates a thread for each conversation initiated through slash commands.
- Uses OpenAI's GPT-3 to generate responses to user prompts.
- Easy to deploy and customize.

## Examples
### Slash command
To start a chat with ChatGPT using a slash command, type `/chat` followed by your message.

Example: `/chat Hello, how are you?`

### Regular message
To start a chat with ChatGPT using a regular message, simply send a message to your bot.

Example: `Hello bot, can you chat with me?`

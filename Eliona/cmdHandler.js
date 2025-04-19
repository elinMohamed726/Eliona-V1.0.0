const fs = require("fs");
const path = require("path");
const commands = new Map();

const commandsPath = path.join( __dirname, "..", "elionaCMDS");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync(path.join(__dirname, '../elionaCMDS'));

const banned = JSON.parse(fs.readFileSync('./data/banned.json'));

for (const folder of commandFolders) {
  const folderPath = path.join(__dirname, '../elionaCMDS', folder);
  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(folderPath, file));
    if (command.name) {
      commands.set(command.name, command);
      console.log(`﴾ ۩ elionaInfo 🐸 ﴿ Loaded command:    ${command.name}`);
    }

   else {
    console.warn(`﴾ ۩ elionaInfo 🐸 ﴿ Invalid command file: ${file}`);

  }
  }
}

   function handleCommand(api, event) {
    const prefix = "."; // تقدر تغيره لو عايز
    const body = event.body;

    if (!body.startsWith(prefix)) return ;

    const args = body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (!command) {
       return api.sendMessage("الامر دا مش موجود🥹 💔", event.threadID);
    }
    if (!commandName){
       return api.sendMessage("أأمرني 🫡",event.threadID ) ;
    }

    if (banned.includes(event.senderID)) {
       return api.sendMessage('🚫 أنت محظور من استخدام هذا البوت🤡.', event.threadID);
    }
    const isAdmin = utils.isAdmin();
    const requiredRole = command.role || 'user';

    if (requiredRole === 'admin' && !isAdmin) {
       return api.sendMessage("🚫 ليس لديك صلاحية لتنفيذ هذا الأمر.", event.threadID);
    }

    try {
      command.execute({api, event, args, context: { commands } });
    } catch (err) { console.error(`[elionaError] Error in command '${commandName}':`, err);
      api.sendMessage("حصل خطأ في تنفيذ الأمر 😥", event.threadID);
    }
  }

module.exports = { handleCommand, commands};

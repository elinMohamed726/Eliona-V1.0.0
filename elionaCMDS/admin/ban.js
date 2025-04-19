const fs = require('fs');
const path = require('path');

const bannedPath = path.join(__dirname, '..', '..', 'data', 'banned.json');

module.exports = {
  name: 'حظر',
  description: 'حظر مستخدم من استخدام البوت',
  role: "admin",
  execute({ api, event, args, isAdmin }) {

    const mentionID = Object.keys(event.mentions)[0];
    if (!mentionID) {
      return api.sendMessage('⚠️ من فضلك قم بعمل @لشخص لحظره.', event.threadID);
    }

    let banned = [];
    if (fs.existsSync(bannedPath)) {
      banned = JSON.parse(fs.readFileSync(bannedPath));
    }

    if (banned.includes(mentionID)) {
      return api.sendMessage('⚠️ هذا المستخدم محظور بالفعل.', event.threadID);
    }

    banned.push(mentionID);
    fs.writeFileSync(bannedPath, JSON.stringify(banned, null, 2));

    const name = event.mentions[mentionID];
    api.sendMessage(`✅ تم حظر ${name} من استخدام البوت.`, event.threadID);
  }
};

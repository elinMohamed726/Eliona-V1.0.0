const fs = require('fs');
const path = require('path');

module.exports = {
  name: "إضافة-ادمن",
  description: "إضافة ادمن جديد إلى البوت",
  role: "admin",

  execute({ api, event, args }) {
    const configPath = path.join(__dirname, '..', '..', 'config.json');
    const senderID = event.senderID;
    const mentionID = Object.keys(event.mentions || {})[0];

    if (!mentionID) {
      return api.sendMessage("❗ من فضلك قم بعمل @منشن للشخص الذي تريد إضافته كأدمن🥹.", event.threadID);
    }

    let config;
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (err) {
      return api.sendMessage("⚠️ حدث خطأ أثناء قراءة ملف الإعدادات.", event.threadID);
    }

    if (config.admins.includes(mentionID)) {
      return api.sendMessage("ℹ️🗿 هذا المستخدم بالفعل أدمن.", event.threadID);
    }

    config.admins.push(mentionID);

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    api.sendMessage(`تم إضافة {event.mentions[mentionID]} إلى قائمة الادمنز بنجاخ🐸✅.`, event.threadID);
 }

};


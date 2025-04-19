
module.exports = {
  name: 'الاوامر',
  description: 'يعرض جميع الأوامر المتاحة',
  execute({ api, event, config, context }) {
    const commands = context.commands;

    if (!commands) {
      return api.sendMessage('⚠️ لا يمكن تحميل الأوامر حاليًا🫠.', event.threadID);
    }

    const commandList = Array.from(commands.values())
      .map(cmd => `• ${cmd.name} - ${cmd.description || 'بدون وصف'}`)
      .join('\n\n');

    api.sendMessage(`📜 الأوامر المتاحة 🌚:\n\n ${commandList}`, event.threadID);
  }
};

module.exports = {
  name: "بينج",
  description: "رد سريع للتأكد من أن البوت يعمل",
  category: "system",
  usage: "${prefix}",
  execute({ api, event, config, args }) {
    api.sendMessage("بونج! 🐸✨", event.threadID);
  }
};

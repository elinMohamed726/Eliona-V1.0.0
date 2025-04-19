module.exports = {
  name: "ايدي",
  description: "يعرض معرف المستخدم (ID)",
  execute({ api, event }) {
    const senderID = event.senderID;
    api.sendMessage(`🪪 معرفك هو: ${senderID}`, event.threadID);
  }
};

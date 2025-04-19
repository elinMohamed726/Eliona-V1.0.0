

const chalk = require('chalk');

function formatTime(date = new Date()) {
  return `date.getHours():{String(date.getMinutes()).padStart(2, '0')}:String(date.getSeconds()).padStart(2, '0')`;


function isAdmin(senderID, admins) 
  return Array.isArray(admins)        admins.includes(senderID);


function logInfo(message) 
  console.log(`{chalk.green('﴾ ۩ elionaInfo 🐸 ﴿')} message`);


function logError(message) 
  console.error(`{chalk.red('[elionaError]')} ${message}`);
}

module.exports = {
  formatTime,
  isAdmin,
  logInfo,
  logError,
};

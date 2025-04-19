
const chalk = require('chalk');
const figlet = require('figlet');
const boxen = require('boxen');
const fs = require('fs');
const path = require('path');

function loadDashboard() {
  const commandsPath = path.join(__dirname, '..', 'elionaCMDS');
  const eventsPath = path.join(__dirname, 'events');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  const eventFiles = fs.existsSync(eventsPath) ? fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')) : [];

  const commandCount = commandFiles.length;
  const eventCount = eventFiles.length;

  console.log(
    chalk.cyan(
      figlet.textSync('Eliona Bot', {
        horizontalLayout: 'default',
      })
    )
  );

  const infoBox = boxen(
    `
chalk.green('﴾ ۩ Eliona ﴿') | Facebook Command Bot 🤖{chalk.yellow('الوضع:')}             chalk.white('✅ متصل'){chalk.yellow('الأوامر المحمّلة:')}   chalk.white(`✅{commandCount} أمر`)}
chalk.yellow('الأحداث المحمّلة:'){chalk.white(`✅ eventCount حدث`){chalk.yellow('وقت التشغيل:')}       ${chalk.white(new Date().toLocaleTimeString())}
    `,
    {
      padding: 1,
      borderColor: 'green',
      borderStyle: 'double',
      title: 'Eliona Dashboard 🐸',
      titleAlignment: 'center',
    }
  );

  console.log(infoBox);
  console.log(chalk.gray('﴾ ۩ Eliona 🐸 ﴿ Dashboard loaded successfully.\n'));
}

module.exports = loadDashboard;

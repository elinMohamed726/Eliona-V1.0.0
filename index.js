const login = require('./fb-chat-api');
const fs = require('fs');
const commandHandler = require("./Eliona/cmdHandler");
const appState = JSON.parse(fs.readFileSync('elionastate.json', 'utf8'));
const path = require('path');
const config = require('./config.json');
login({ appState, forceLogin: true }, (err, api) => {
  if (err) return console.error(err);

  api.setOptions({ listenEvents: true });
  api.listen((err, event) => {if (err) return console.error(err);

    if (event.type === "message" && event.body) {
       commandHandler.
       handleCommand(api, event);
    }
  });
});

const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config');

const token = config.telegramToken;
const herokuURL = config.herokuURL;

const bot = new TelegramBot(token, {
    webHook: {
        port: process.env.PORT || 5000
    }
});

bot.setWebHook(`${herokuURL}/${token}`);

module.exports = bot;
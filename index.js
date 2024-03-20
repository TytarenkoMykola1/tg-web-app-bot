const TelegramBot = require('node-telegram-bot-api');

const token = '7124125013:AAEPqBpQBRaq4rRekeE3Vcucaxu28DvC3dQ';
const webAppUrl = 'https://steamcommunity.com/market/';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId,'Знизу зявиться кнопка, заповніть форму', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заповніть форму', web_app: {url: webAppUrl}}]
                ]
            }
        })

        await bot.sendMessage(chatId,'Заходіть в наш інтернет магазин по кнопці нище', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Зробити замовлення', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

});
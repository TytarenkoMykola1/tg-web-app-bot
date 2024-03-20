const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const token = '7124125013:AAEPqBpQBRaq4rRekeE3Vcucaxu28DvC3dQ';
const webAppUrl = 'https://silver-macaron-d5de91.netlify.app';
const bot = new TelegramBot(token, {polling: true});

const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId,'Знизу зявиться кнопка, заповніть форму', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заповніть форму', web_app: {url: webAppUrl + '/form'}}]
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
    if(msg?.web_app_data?.data) {
        try{
            const data = JSON.parse(msg?.web_app_data?.data)

           await bot.sendMessage(chatId,'Дякую за зворотній відгук!')
           await bot.sendMessage(chatId,'Ваша країна: ' + data?.country);
           await bot.sendMessage(chatId,'Ваша вулиця: ' + data?.street);

           setTimeout(async () => {
               await bot.sendMessage(chatId,'Всю інформацію ви получите в цьому чаті');
           }, 3000)
        } catch (e){
            console.log(e);
        }
        const data = JSON.parse(msg?.web_app_data?.data)
    }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products, totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успішна покупка',
            input_message_content: {message_text: 'Вітаю з покупкою, ви купити товар на суму ' + totalPrice}
        })
        return res.status(200).json({});
    } catch (e) {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Не вдалось купити товар ',
            input_message_content: {message_text: 'Не вдалось купити товар '}
        })
    }
    return res.status(500).json({});
})

const PORT = 8000;

app.listen(PORT,() => console.log('server started on PORT' + PORT))
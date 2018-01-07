const { exec } = require('child_process')
const { promisify } = require('util')
const TelegramBot = require('node-telegram-bot-api')
const { botToken } = require('./config')

const execp = promisify(exec)
const bot = new TelegramBot(botToken, { polling: true })

const chatIds = [
  124155805
]

const checkLog = () => execp('tail -n 10 /home/hungwei/project/ptt-board-monitor/logs/Lifeismoney.log')

bot.onText(/\/help/, msg => {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['Check Log']
      ]
    })
  }

  bot.sendMessage(msg.chat.id, 'May I help you?', opts) 
})

bot.onText(/\Check Log/, async msg => {
  const message = await checkLog()
  bot.sendMessage(msg.chat.id, message)
})

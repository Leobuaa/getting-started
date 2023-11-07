#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
/**
 * Wechaty - Conversational RPA SDK for Chatbot Makers.
 *  - https://github.com/wechaty/wechaty
 */
// https://stackoverflow.com/a/42817956/1123955
// https://github.com/motdotla/dotenv/issues/89#issuecomment-587753552
import 'dotenv/config.js'

import {
  Contact,
  Message,
  ScanStatus,
  WechatyBuilder,
  log,
}                  from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'

function onScan (qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')
    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console

  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

function onLogin (user: Contact) {
  log.info('StarterBot', '%s login', user)
}

function onLogout (user: Contact) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage (msg: Message) {
  log.info('StarterBot', msg.toString())
  const delayTime = Math.floor(Math.random() * 50 + 100)
  log.info('Delay mins: ', delayTime.toString())

  await delay(1000 * 60 * delayTime);
  await msg.say(getRandomQuestion(questions))
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

function getRandomQuestion(questions: string[]): string {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

const questions: string[] = [
    "最喜欢的电影是什么？",
    "如果能去任何地方旅行，你会选择哪里？",
    "你的梦想工作是什么？",
    "有没有一本书改变了你的看法？",
    "你最喜欢的季节是哪个？为什么？",
    "你认为自己最大的成就是什么？",
    "最喜欢的童年记忆是什么？",
    "你喜欢哪种音乐类型？",
    "有没有一项技能你希望能够掌握？",
    "你最尊敬的人是谁？",
    "最近看过的一部影响你的电影是哪一部？",
    "有没有一个习惯你希望能改变？",
    "你最害怕什么？",
    "你平常如何放松？",
    "如果你能拥有一种超能力，那会是什么？",
    "你认为友谊最重要的是什么？",
    "如果你能回到过去，你想去哪个时代？",
    "你最喜欢的节日是什么？",
    "做过的最疯狂的事是什么？",
    "如果今天是你的最后一天，你最想做什么？"
];

const bot = WechatyBuilder.build({
  name: 'ding-dong-bot',
  /**
   * You can specific `puppet` and `puppetOptions` here with hard coding:
   *
  puppet: 'wechaty-puppet-wechat',
  puppetOptions: {
    uos: true,
  },
   */
  /**
   * How to set Wechaty Puppet Provider:
   *
   *  1. Specify a `puppet` option when instantiating Wechaty. (like `{ puppet: 'wechaty-puppet-whatsapp' }`, see below)
   *  1. Set the `WECHATY_PUPPET` environment variable to the puppet NPM module name. (like `wechaty-puppet-whatsapp`)
   *
   * You can use the following providers locally:
   *  - wechaty-puppet-wechat (web protocol, no token required)
   *  - wechaty-puppet-whatsapp (web protocol, no token required)
   *  - wechaty-puppet-padlocal (pad protocol, token required)
   *  - etc. see: <https://wechaty.js.org/docs/puppet-providers/>
   */
  // puppet: 'wechaty-puppet-whatsapp'

  /**
   * You can use wechaty puppet provider 'wechaty-puppet-service'
   *   which can connect to remote Wechaty Puppet Services
   *   for using more powerful protocol.
   * Learn more about services (and TOKEN) from https://wechaty.js.org/docs/puppet-services/
   */
  // puppet: 'wechaty-puppet-service'
  // puppetOptions: {
  //   token: 'xxx',
  // }
})

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch(e => log.error('StarterBot', e))

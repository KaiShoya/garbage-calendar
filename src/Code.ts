// lineからのwebhook受信時に発火する
function doPost(e: any) {
  // とりあえず北A固定
  const garbage = new Garbage('北A')
  const exception = new Exception()
  const postData = JSON.parse(e.postData.contents)
  const replyToken: string = postData.events[0].replyToken
  const userId: string = postData.events[0].source.userId
  if (typeof replyToken === 'undefined') {
    return ContentService.createTextOutput(
      JSON.stringify({content: 'replyToken is undefined.'})
    ).setMimeType(ContentService.MimeType.JSON)
  }
  const type = postData.events[0].type
  switch (type) {
    case 'follow':
    case 'unfollow':
    case 'join':
    case 'leave':
    case 'postback':
    default:
      break
    case 'message':
      const message = postData.events[0].message
      const msgArray = []

      if (message.type == 'text') {
        let date: Date
        if (message.text.indexOf('今日') != -1) {
          // メッセージに「今日」が含まれていたら、今日収集するゴミの種類をリプライ通知する
          date = exception.checkExceptionDate(new Date())
          const whatDay = garbage.whatDay(date)
          if (whatDay) msgArray.push(Line.defaultMsg(whatDay))
        }
      }

      if (msgArray.length > 0) Line.reply(replyToken, msgArray)
      break
  }
  return ContentService.createTextOutput(
    JSON.stringify({content: 'post ok'})
  ).setMimeType(ContentService.MimeType.JSON)
}

function doGet(e: any) {
  return ContentService.createTextOutput(
    JSON.stringify({content: 'get ok'})
  ).setMimeType(ContentService.MimeType.JSON)
}

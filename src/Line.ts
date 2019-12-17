class Line {
  // ユーザーのつぶやきにリプライを返す
  public static reply(replyToken: string, msg: Array<Object>) {
    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN
      },
      method: 'post',
      payload: JSON.stringify({
        replyToken: replyToken,
        messages: msg
      })
    })
  }

  // 第1引数で指定したユーザーにプッシュ通知をする
  public static push(to: string, msg: Array<Object>) {
    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN
      },
      method: 'post',
      payload: JSON.stringify({
        to: to,
        messages: msg
      })
    })
  }

  // シンプルなテキストを送信するテンプレート
  public static defaultMsg(msg: string) {
    return {
      type: 'text',
      text: msg
    }
  }

  /**
   * ボタンテンプレートを作成する
   * @param msg ラベル
   * @param actions アクションオブジェクトの配列
   */
  public static buttonMsg(msg: string, actions: Array<Object>) {
    return {
      type: 'template',
      altText: msg,
      template: {
        type: 'buttons',
        text: msg,
        actions: actions
      }
    }
  }

  /**
   * postbackアクションを作成する
   * @param msg ラベル
   * @param data データタイプ
   * @param qno 質問番号
   * @param action ボタン番号
   */
  public static postbackAction(msg: string, type: string, qno: string, action: number) {
    return {
      type: 'postback',
      label: msg,
      data: 'type=' + type + '&qno=' + qno + '&action=' + action
    }
  }

  /**
   * messageアクションを作成する
   * @param msg ラベル
   */
  public static messageAction(msg: string) {
    return {
      type: 'message',
      label: msg,
      text: msg
    }
  }

  /**
   * datepickerアクションを作成する
   * @param msg ラベル
   * @param data データタイプ
   */
  public static datePickerAction(msg: string, data: string) {
    return {
      type: 'datetimepicker',
      label: msg,
      data: 'type=' + data,
      mode: 'date'
    }
  }
}

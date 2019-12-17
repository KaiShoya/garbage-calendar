class Context {
  /**
   * 0埋め
   * @param num 0埋めしたい数字
   * @param digit default: 2
   */
  public static zeroPadding(num: number, digit?: number) {
    if (typeof digit === 'undefined') digit = 2
    let zero = ''
    for (let i = 0; i < digit; i++) zero = zero + '0'
    return (zero + num).slice(-digit)
  }

  /**
   * date型をyyyy/mm/ddの文字列に変換する
   * @param date
   */
  public static formatYMD(date: Date) {
    if (typeof date.getFullYear() !== 'function') return date
    return (
      date.getFullYear() +
      '/' +
      this.zeroPadding(date.getMonth() + 1, 2) +
      '/' +
      this.zeroPadding(date.getDate(), 2)
    )
  }

  /**
   * postbackのdataをhashに変換する
   * @param data
   */
  public static postback2hash(data: string) {
    const d: string[] = data.split('&')
    let hash = {}
    for (const i in d) {
      const keySearch = d[i].search(/=/)
      let key = ''
      if (keySearch != -1) key = d[i].slice(0, keySearch)
      const val = d[i].slice(d[i].indexOf('=', 0) + 1)
      if (key != '') hash[key] = decodeURI(val)
    }
    return hash
  }

  /**
   * hashをhttpパラメータに変換する
   * @param data
   */
  public static hash2param(data: Array<any>) {
    let arr = []
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        arr.push(i + '=' + data[i])
      }
    }
    return arr.join('&')
  }

  /**
   * datepickerで取得した値を日本人向けにフォーマットする
   * @param value
   */
  public static date2japanese(value: string) {
    const date = value.split('-')
    return date[0] + '年' + date[1] + '月' + date[2] + '日'
  }

  /**
   * timepickerで取得した値を日本人向けにフォーマットする
   * @param value
   */
  public static time2japanese(value: string) {
    const time = value.split(':')
    return time[0] + '時' + time[1] + '分'
  }

  /**
   * datetimepickerで取得した値を日本人向けにフォーマットする
   * @param value
   */
  public static datetime2japanese(value: string) {
    const array = value.split('T')
    const date = this.date2japanese(array[0])
    const time = this.time2japanese(array[1])
    return date + time
  }
}

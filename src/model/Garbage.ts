class Garbage extends Spreadsheet {
  /**
   * @param district 北A,北B,南A,南B
   */
  constructor(district: string) {
    super(district, 0)
  }

  /**
   * 何の日かを返す
   * @param date チェックする日付
   */
  public whatDay(date: Date): string {
    if (date == null) return null
    const dac = this.getDayAndCount(date)
    const v = this.findRow(dac.day)
    return v[dac.count]
  }

  /**
   * 引数の日付が第何何曜日かをチェックする
   * @param date 日付
   */
  public getDayAndCount(date: Date) {
    const weekday = ['日', '月', '火', '水', '木', '金', '土', '日']
    return {
      day: weekday[date.getDay()],
      count: Math.floor((date.getDate() - 1) / 7) + 1
    }
  }
}

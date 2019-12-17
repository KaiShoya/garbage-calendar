class Exception extends Spreadsheet {
  constructor() {
    super('例外', 0)
  }

  /**
   * 日付で列番号を検索する
   * @param date 検索する日付
   * @param columnNo 検索する列番号
   */
  public findNum(date: Date, columnNo: number): number {
    for (let i in this.values) {
      const item = this.values[i][columnNo]
      let diffDate = new Date(item.toString())
      diffDate.setHours(0)
      diffDate.setMinutes(0)
      diffDate.setSeconds(0)
      diffDate.setMilliseconds(0)
      if (date === diffDate) {
        return Number(i)
      }
    }
    return -1
  }

  /**
   * 日付が例外じゃないかチェックする
   * 例外だった場合、NULLを返す
   * 振替対象日だった場合、振替の日付を返す
   * 当てはまらなかった場合は引数を返す
   * @param date チェックする日付
   */
  public checkExceptionDate(date: Date): Date {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    let rowNo = this.findNum(date, 0)
    if (rowNo != -1) return null

    rowNo = this.findNum(date, 1)
    if (rowNo != -1) return new Date(this.values[rowNo][0])

    return date
  }
}

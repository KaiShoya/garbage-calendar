class Log {
  private sheet: GoogleAppsScript.Spreadsheet.Sheet
  constructor() {
    this.sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('ログ')
  }

  public insert(msg: any) {
    const ts = new Date().toLocaleString('japanese', {timeZone: 'Asia/Tokyo'})
    if (msg instanceof Object) {
      if (msg instanceof Array) {
        msg.unshift(ts)
        this.sheet.appendRow(msg)
      } else {
        var userid = msg.events[0].source.userId
        var type = msg.events[0].type
        this.sheet.appendRow([ts, userid, type, msg.events[0]])
      }
    } else {
      this.sheet.appendRow([ts, null, null, msg])
    }
  }
}

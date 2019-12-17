/**
 * スプレッドシートを読み書きするためのメソッドを詰め込んだクラス
 * 検索・更新のため、シートにユニークな列が必要
 */
class Spreadsheet {
  protected sheet: GoogleAppsScript.Spreadsheet.Sheet
  protected range: GoogleAppsScript.Spreadsheet.Range
  protected columnName: string[]
  protected values: string[][]
  protected searchColumn: number
  // protected timestamp: string

  constructor(sheetName: string, searchColumn: number, sheetId?: string) {
    this.sheet = SpreadsheetApp.openById(
      sheetId ? sheetId : SHEET_ID
    ).getSheetByName(sheetName)
    this.searchColumn = searchColumn
    this.range = this.sheet.getDataRange()
    this.values = this.range.getValues()
    this.columnName = this.values.shift()
  }

  /**
   * 列番号を指定して検索する
   * 見つからなかった場合-1を返す
   * @param text 検索する文字列
   * @param columnNo 検索する列番号 defalut: constructorの第二引数
   * @returns 列番号: number
   */
  public findRowNum(text: string, columnNo?: number): number {
    const column = columnNo == undefined ? this.searchColumn : columnNo

    for (let i in this.values) {
      const item = this.values[i][columnNo]
      if (text === item.toString()) {
        return Number(i)
      }
    }

    return -1
  }

  /**
   * 列番号を指定して検索し、検索結果を配列で返す
   * 見つからなかった場合nullを返す
   * @param text 検索する文字列
   * @param columnNo 検索する列番号 defalut: constructorの第二引数
   * @returns データ: string[]
   */
  public findRow(text: string, columnNo?: number): string[] {
    const column = columnNo == undefined ? this.searchColumn : columnNo
    const rowNo = this.findRowNum(text, column)

    if (rowNo == -1) return null

    return this.values[rowNo]
  }

  public getValues() {
    return this.values
  }

  public createHash(values?: string[][]) {
    const v = values == undefined ? this.values : values
    return v.map(x => {
      let value = {}
      for (const i in x) {
        if (x.hasOwnProperty(i)) {
          value[this.columnName[i]] = x[i]
        }
      }
      return value
    })
  }

  /**
   * シートにデータを追加する
   * @param data 追加するデータの配列
   */
  public insert(data: any[]): any {
    this.sheet.appendRow(data)
  }

  /**
   * シートにデータを上書きする
   * 更新できなかった場合nullを返す
   * @param data 検索する文字列
   * @param columnNo 検索する列番号 defalut: constructorの第二引数
   * @returns 列データ: GoogleAppsScript.Spreadsheet.Range
   */
  public update(
    data: any[],
    columnNo?: number
  ): GoogleAppsScript.Spreadsheet.Range {
    const column = columnNo == undefined ? this.searchColumn : columnNo
    const rowNo = this.findRowNum(data[column], column)

    if (rowNo == -1) return null

    const row = this.sheet.getRange(
      Number(rowNo) + 1,
      1,
      1,
      this.sheet.getLastColumn()
    )

    return row.setValues([data])
  }
}

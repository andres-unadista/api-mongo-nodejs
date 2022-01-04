const excelReport = (products, name, res) => {
  const x1 = require('excel4node')

  products = products.map((product) => {
    let id = product._id.toString()
    delete product._id
    return {
      id,
      ...product
    }
  })

  let wb = new x1.Workbook();
  let ws = wb.addWorksheet('Inventario')

  const keys = Object.keys(products[0])
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    let row = 1
    let column = index + 1
    if (typeof key === 'string') {
      ws.cell(row, column).string(key)
    } else if(typeof key === 'number') {
      ws.cell(row, column).number(key)
    }
  }

  for (let row = 1; row <= products.length; row++) {
    let rowIndex = 1 + row;
    const productRow = products[row - 1];
    for (let column = 1; column <= Object.values(productRow).length; column++) {
      const data = Object.values(productRow)[column - 1];
      if (typeof data === 'string') {
        ws.cell(rowIndex, column).string(data)
      } else if(typeof data === 'number') {
        ws.cell(rowIndex, column).number(data)
      }
    }
  }


  wb.write(`${name}.xlsx`, res)
}

module.exports.ReportUtils = {
  excelReport
}
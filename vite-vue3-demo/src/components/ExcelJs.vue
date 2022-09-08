<template>
  <div>测试</div>
</template>
<script lang="ts">
import ExcelJS from 'exceljs';
//  创建工作簿
const workbook = new ExcelJS.Workbook();
//  添加工作表
const sheet = workbook.addWorksheet('工作表1');
sheet.columns = [
  {
    header: 'Id', key: 'id'
  },
  {
    header: 'Name', key: 'name'
  },
  {
    header: 'Work', key: 'work'
  }
]
const row1 = sheet.getRow(1)
row1.getCell(1).value = '0'
row1.getCell(2).value = 'Tom'
row1.getCell(3).value = 'It'
const row2 = sheet.getRow(2)
row2.getCell(1).value = '1'
row2.getCell(2).value = 'Jery'
row2.getCell(3).value = 'Doctor'
await workbook.csv.writeFile('./files/test.csv')
</script>
<style>
</style>
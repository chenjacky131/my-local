<template>
  <form ref="form">
    <input
      type="file"
      accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @change="importExcel2"
    />
  </form>
</template>
<script setup>
import ExcelJS from 'exceljs'
import { ref } from 'vue';
const form = ref(null);
const workbook = new ExcelJS.Workbook();
const importExcel = async (e) => { //  导入指定码头2023年各月靠泊量及环同比数据
  const filename = e.target.files[0]
  // 从文件读取
  let xls = await workbook.xlsx.load(filename);
  const rows = xls.getWorksheet('Sheet1')._rows //  表格列数据集合
  const data = [];
  let pierName;
  rows.map((row, rowIndex) => { //  循环行数
    if(rowIndex<2 || rowIndex > 13){
      return;
    }
    let rowObj = {}
    let year;
    row._cells.map((cell, cellIndex) => { //  循环含里面的单元格数据
      if(cell.col > 53) return;
      if(cellIndex === 0){  //  获取码头名称
        pierName = cell.text;
        return;
      }
      const colLetter = cell._address.match(/[a-zA-Z]/g).join('');  //  列字母
      switch(colLetter){
        case 'B':
          year = '202212';
          break;
        case 'F':
          year = '202301';
          break;
        case 'J':
          year = '202302';
          break;
        case 'N':
          year = '202303';
          break;
        case 'R':
          year = '202304';
          break;
        case 'V':
          year = '202305';
          break;
        case 'Z':
          year = '202306';
          break;
        case 'AD':
          year = '202307';
          break;
        case 'AH':
          year = '202308';
          break;
        case 'AL':
          year = '202309';
          break;
        case 'AP':
          year = '202310';
          break;
        case 'AT':
          year = '202311';
          break;
        case 'AX':
          year = '202312';
          break;
      }
      let dataType;
      switch(colLetter){
        case 'B':
        case 'F':
        case 'J':
        case 'N':
        case 'R':
        case 'V':
        case 'Z':
        case 'AD':
        case 'AH':
        case 'AL':
        case 'AP':
        case 'AT':
        case 'AX':
          dataType = 'benqi';
          break;
        case 'C':
        case 'G':
        case 'K':
        case 'O':
        case 'S':
        case 'W':
        case 'AA':
        case 'AE':
        case 'AI':
        case 'AM':
        case 'AQ':
        case 'AU':
        case 'AY':
          dataType = 'shangqi';
          break;
        case 'D':
        case 'H':
        case 'L':
        case 'P':
        case 'T':
        case 'X':
        case 'AB':
        case 'AF':
        case 'AJ':
        case 'AN':
        case 'AR':
        case 'AV':
        case 'AZ':
          dataType = 'huanbi';
          break;
        case 'E':
        case 'I':
        case 'M':
        case 'Q':
        case 'U':
        case 'Y':
        case 'AC':
        case 'AG':
        case 'AK':
        case 'AO':
        case 'AS':
        case 'AW':
        case 'BA':
          dataType = 'tongbi';
          break;
      }
      rowObj[dataType] = cell.text;
      data.push({
        pierName,
        year,
        value: cell.text,
        dataType
      })
      console.log(`列名：${cell._address},列序号:${cell.col},行:${rowIndex},值:${cell.text}`)
    });
  });
  form.value.reset()
}
const importExcel2 = async (e) => { //  导入厦门港及指定码头2019-2023年靠泊量
  const filename = e.target.files[0]
  // 从文件读取
  let xls = await workbook.xlsx.load(filename);
  const rows = xls.getWorksheet('Sheet1')._rows //  表格列数据集合
  const data = [];
  let pierName;
  rows.map((row, rowIndex) => { //  循环行数
    if(rowIndex<18 || rowIndex > 29){
      return;
    }
    let rowObj = {}
    let year;
    row._cells.map((cell, cellIndex) => { //  循环含里面的单元格数据
      if(cell.col > 11) return;
      if(cellIndex === 0){  //  获取码头名称
        pierName = cell.text;
        return;
      }
      const colLetter = cell._address.match(/[a-zA-Z]/g).join('');  //  列字母
      switch(colLetter){
        case 'B':
          year = '2019';
          break;
        case 'D':
          year = '2020';
          break;
        case 'F':
          year = '2021';
          break;
        case 'H':
          year = '2022';
          break;
        case 'J':
          year = '2023';
          break;
      }
      let dataType;
      switch(colLetter){
        case 'B':
        case 'D':
        case 'F':
        case 'H':
        case 'J':
          dataType = 'benqi';
          break;
        case 'C':
        case 'E':
        case 'I':
        case 'K':
          dataType = 'tongbi';
          break;
      }
      rowObj[dataType] = cell.text;
      data.push({
        pierName,
        year,
        value: cell.text,
        dataType
      })
      // console.log(`列名：${cell._address},列序号:${cell.col},行:${rowIndex},值:${cell.text}`)
    });
  });
  console.log(data);
  form.value.reset()
}
</script>
import XLSX from 'xlsx';

const workbook = XLSX.readFile('document.xlsx');
const sheetNames = workbook.SheetNames;

console.log(`\n📊 Excel file contains ${sheetNames.length} sheet(s):\n`);

sheetNames.forEach((sheetName, index) => {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Sheet ${index + 1}: ${sheetName}`);
  console.log('='.repeat(80));
  
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  
  // Show first 20 rows
  const rowsToShow = Math.min(20, data.length);
  
  data.slice(0, rowsToShow).forEach((row, rowIndex) => {
    if (row.some(cell => cell !== '')) {
      console.log(`Row ${rowIndex + 1}:`, row.join(' | '));
    }
  });
  
  if (data.length > rowsToShow) {
    console.log(`\n... and ${data.length - rowsToShow} more rows`);
  }
});

import mammoth from 'mammoth';
import fs from 'fs';

const result = await mammoth.extractRawText({path: 'document.docx'});
console.log(result.value);

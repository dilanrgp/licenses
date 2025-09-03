import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic/dist/index.js';
import { Essentials } from '@ckeditor/ckeditor5-essentials/dist/index.js';
import { Bold } from '@ckeditor/ckeditor5-basic-styles/dist/index.js';
import { Italic } from '@ckeditor/ckeditor5-basic-styles/dist/index.js';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph/dist/index.js';
import { Alignment } from '@ckeditor/ckeditor5-alignment/dist/index.js';
import { Indent } from '@ckeditor/ckeditor5-indent/dist/index.js';
import { IndentBlock } from '@ckeditor/ckeditor5-indent/dist/index.js';
import { Table } from '@ckeditor/ckeditor5-table/dist/index.js';
import { TableToolbar } from '@ckeditor/ckeditor5-table/dist/index.js';
import { TableProperties } from '@ckeditor/ckeditor5-table/dist/index.js';
import { TableCellProperties } from '@ckeditor/ckeditor5-table/dist/index.js';
import { TableColumnResize } from '@ckeditor/ckeditor5-table/dist/index.js';
import { Heading } from '@ckeditor/ckeditor5-heading/dist/index.js';

export default class CustomEditor extends ClassicEditor {}

(CustomEditor as any).builtinPlugins = [
  Essentials,
  Bold,
  Italic,
  Paragraph,
  Alignment,
  Indent,
  IndentBlock,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  TableColumnResize,
  Heading,
];
(CustomEditor as any).defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'alignment',
      '|',
      'outdent',
      'indent',
      '|',
      'insertTable',
      '|',
      'undo',
      'redo',
    ],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
    ],
  },
  language: 'es',
  licenseKey: 'GPL',
};

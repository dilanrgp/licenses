import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Link } from '@ckeditor/ckeditor5-link';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { Alignment } from '@ckeditor/ckeditor5-alignment';

import { loadSvg } from '@utils/icon-loader';

export default class CustomEditor extends ClassicEditorBase {
    public static override builtinPlugins = [
        Bold,
        Italic,
        Table,
        Alignment
    ];

    public static override defaultConfig = {
        toolbar: {
            items: [
                'undo', 'redo',
                '|', 'bold', 'italic',
                '|', 'insertTable'
            ]
        },
        language: 'es',
        licenseKey: 'GPL'
    };
}


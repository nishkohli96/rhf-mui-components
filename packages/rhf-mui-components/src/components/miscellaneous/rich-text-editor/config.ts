/**
 * Default Editor Config for CkEditor in the RHFRichTextEditor component.
 *
 * To view the list of complete features, refer
 * https://ckeditor.com/docs/ckeditor5/latest/features/index.html
 *
 * For an advanced feature usage example, refer
 * https://github.com/nishkohli96/react-libs/blob/main/src/pages/rte/CkEditorAdvanced.tsx
 */
import {
  Essentials,
  Undo,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  Link,
  List,
  BlockQuote,
  CodeBlock,
  Table,
  TableToolbar,
  Alignment
} from 'ckeditor5';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';

export const defaultEditorConfig: EditorConfig = {
  plugins: [
    Essentials,
    Undo,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading,
    Link,
    List,
    BlockQuote,
    CodeBlock,
    Table,
    TableToolbar,
    Alignment
  ],
  toolbar: {
    /**
     * The arragement of the formatting controls is determined by their
     * order in the "items" array. "|" is the separtor to group similar
     * controls.
     */
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      'alignment',
      'blockQuote',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'link',
      'codeBlock',
      'insertTable'
    ]
  },
  /**
   * By default only "paragraph", "h1", "h2" and "h3" options appear
   * under the heading dropdown. I've provided the option to view all
   * headings from "h1" to "h6".
   */
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph'
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1'
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2'
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3'
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4'
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5'
      },
      {
        model: 'heading6',
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6'
      }
    ]
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  }
};

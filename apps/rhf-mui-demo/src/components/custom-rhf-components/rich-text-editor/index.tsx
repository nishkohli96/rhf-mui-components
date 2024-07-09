import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EventInfo } from '@ckeditor/ckeditor5-utils';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

type RHFRichTextEditorProps = {
  value: string | null;
  errorMsg?: string;
  onChange: (newVal: string) => void;
  disabled?: boolean;
};

export function RHFRichTextEditor({
  value,
  errorMsg,
  onChange,
  disabled
}: RHFRichTextEditorProps) {
  const isError = Boolean(errorMsg);

  const handleEditorChange = (_: EventInfo, editor: ClassicEditor) => {
    const content = editor.getData();
    onChange(content);
  };

  return (
    <FormControl fullWidth sx={{ borderRadius: '10px' }}>
      <FormLabel
        sx={{
          fontSize: '0.75rem',
          mb: '5px',
          color: '#060606'
        }}
      >
        Rich Text Editor
      </FormLabel>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={handleEditorChange}
        disabled={disabled}
        config={{
          toolbar: { removeItems: ['uploadImage', 'mediaEmbed'] },
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
          }
        }}
      />
      {isError && (
        <FormHelperText error={isError} sx={{ ml: 0 }}>
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
}

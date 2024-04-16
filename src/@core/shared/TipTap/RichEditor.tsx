import { Paper } from '@mui/material';
import EditorMenuControls from '@src/@core/shared/TipTap/EditorMenuControls';
import useExtensions from '@src/hooks/useTipTapExtensions';
import { RichTextEditor, type RichTextEditorRef } from 'mui-tiptap';
import React, { ReactNode, useRef } from 'react';

function RichEditor({
  label,
  value,
  onChange,
  refresh = false,
}: {
  label?: string | ReactNode;
  value: string;
  onChange: (val: string) => void;
  refresh?: boolean;
}) {
  const rteRef = useRef<RichTextEditorRef>(null);
  const [fontSize, setFontSize] = React.useState('16px');
  const extensions = useExtensions();
  const [defaultValue, setDefaultValue] = React.useState(value);
  const forceUpdate = React.useRef(false);
  const count = React.useRef(0);

  React.useEffect(() => {
    setDefaultValue(value);
    if (refresh && count.current < 2) {
      forceUpdate.current = !forceUpdate.current;
      count.current = ++count.current;
    }
  }, [value]);

  return (
    <Paper>
      <RichTextEditor
        key={forceUpdate.current ? 'update' : 'updateAgain'}
        onUpdate={(props) => {
          onChange(props.editor.getHTML());
        }}
        ref={rteRef}
        RichTextFieldProps={{
          RichTextContentProps: { className: 'px-5' },
          variant: 'standard',
        }}
        editable
        enableInputRules
        enableCoreExtensions
        enablePasteRules
        extensions={extensions} // Or any Tiptap extensions you wish!
        content={defaultValue} // Initial content for the editor
        // Optionally include `renderControls` for a menu-bar atop the editor:
        renderControls={() => <EditorMenuControls label={label} />}
      />
    </Paper>
  );
}

export default RichEditor;

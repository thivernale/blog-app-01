import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  defaultValue?: string;
};

export function RTE<T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
}: Props<T>) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 inline-block pl-1">{label}</label>}
      <Controller
        name={name || ('content' as Path<T>)}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            onEditorChange={onChange}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        )}
      />
    </div>
  );
}

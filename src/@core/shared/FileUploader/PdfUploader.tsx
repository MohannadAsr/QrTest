import MuiIcon from '@src/@core/components/MuiIcon';
import { useFile } from '@src/hooks/useFile';
import React from 'react';
import TextTranslation from '../Translation/TextTranslation';

interface PdfUploaderProps {
  File: File;
  setFile: React.Dispatch<React.SetStateAction<File>>;
  handleDeleteUrl?: (props: string) => any;
  url?: string[] | File[];
  disabled?: boolean;
}

function PdfUploader({ File, setFile, url, disabled }: PdfUploaderProps) {
  const { openFileWindow, toBase64, getFileName, getImageUrl } = useFile();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const uploader = (payload: { file: File; base64: string }) => {
    setFile(payload.file);
    setImagePreview(URL.createObjectURL(payload.file));
  };

  return (
    <div
      className={`relative p-3  border-dashed border-primary ${
        disabled ? 'bg-primary/10' : 'bg-primary/30'
      }   rounded-lg flex flex-col items-center ${
        !disabled && 'cursor-pointer'
      }  justify-center h-[150px] w-[150px] overflow-hidden`}
      onClick={() => (!disabled ? openFileWindow(uploader) : null)}
    >
      {!File && (
        <>
          <MuiIcon name="Upload" sx={{ fontSize: 50 }} color="primary" />
          <p className=" uppercase text-[13px] text-center">
            <TextTranslation>Upload File</TextTranslation>
          </p>
        </>
      )}
      {File && (
        <div className=" flex flex-col gap-2 items-center justify-center ">
          <MuiIcon name="PictureAsPdf" sx={{ fontSize: 50 }} color="action" />
          <p className=" truncate">{File.name}</p>
        </div>
      )}
    </div>
  );
}

export default PdfUploader;

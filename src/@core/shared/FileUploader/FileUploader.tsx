import { Button, IconButton } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import { useFile } from '@src/hooks/useFile';

import React from 'react';

interface FileUploaderProps {
  File: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

function FileUploader({
  File,
  setFile,
  ...rest
}: FileUploaderProps &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) {
  const { openFileWindow, toBase64, getFileName } = useFile();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const uploader = (payload: { file: File; base64: string }) => {
    setFile(payload.file);
    setImagePreview(URL.createObjectURL(payload.file));
  };

  const deleteFile = () => {
    setImagePreview(null);
    setFile(null);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // Add visual indication for drag-and-drop
    event.currentTarget.classList.add('drag-over');
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // Remove visual indication when leaving the drag-and-drop area
    event.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // Remove visual indication when dropping the file
    event.currentTarget.classList.remove('drag-over');

    if (event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      uploader({ file: droppedFile, base64: '' }); // You can handle base64 conversion if needed
    }
  };

  return (
    <div
      {...rest}
      className={` ${
        rest.className && `${rest.className}`
      } relative p-3  border-dashed border-primary bg-white/30  brand-rounded rounded-lg flex flex-col items-center justify-center  min-h-[250px]  border-2 max-h-[350px] `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {File && (
        <div className=" absolute left-1/2 -bottom-4 -translate-x-1/2 ">
          <IconButton
            onClick={deleteFile}
            sx={{
              backgroundColor: '#fff',
              ':hover': { backgroundColor: '#fff' },
            }}
          >
            <MuiIcon name="Delete" color="error" />
          </IconButton>
        </div>
      )}
      {!imagePreview && (
        <div
          className=" flex flex-col items-center gap-4 cursor-pointer  p-5 "
          onClick={() => openFileWindow(uploader)}
        >
          <p className=" text-3 text-primary uppercase text-center">
            Bild ablegen oder auswählen
          </p>
          <MuiIcon name="Upload" sx={{ fontSize: 70 }} color="primary" />
        </div>
      )}

      {imagePreview && (
        <div>
          <img
            src={imagePreview}
            alt={File?.name || ''}
            className=" brand-rounded object-contain w-full h-full max-h-[250px]"
          />
        </div>
      )}
    </div>
  );
}

export default FileUploader;

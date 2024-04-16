import { Button, IconButton } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import { useFile } from '@src/hooks/useFile';

import React from 'react';

interface FileUploaderProps {
  Files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  handleDeleteUrl?: (props: string) => any;
  urls?: string[] | File[];
}

function MultiFileUploader({
  Files,
  setFiles,
  urls,
  handleDeleteUrl,
  ...rest
}: FileUploaderProps &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) {
  const { openFileWindow, MultipleopenFileWindow, toBase64, getFileName } =
    useFile();
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  const uploader = (payload: { files: File[]; base64: string[] }) => {
    setFiles((prev: File[]) => {
      return [...prev, ...payload.files];
    });
    setImagePreviews((prev: string[]) => {
      return [
        ...prev,
        ...payload.files.map((file) => URL.createObjectURL(file)),
      ];
    });
  };

  React.useEffect(() => {
    setImagePreviews(Files?.map((file) => URL.createObjectURL(file)));
  }, []);

  const deleteFile = (index: number) => {
    const updatedFiles = [...Files];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const deleteUrl = (index: number) => {
    console.log(index);
    handleDeleteUrl(urls[index] as string);
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
    // Remove visual indication when dropping the files
    event.currentTarget.classList.remove('drag-over');

    if (event.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(event.dataTransfer.files);
      uploader({
        files: droppedFiles,
        base64: droppedFiles.map(() => ''), // You can handle base64 conversion if needed
      });
    }
  };

  return (
    <div
      {...rest}
      className={` ${
        rest.className && `${rest.className}`
      } relative p-3  border-dashed border-primary  flex flex-col items-center justify-center bg-primary/10  min-h-[250px]   border-2  `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className=" flex flex-col items-center gap-4 cursor-pointer  p-5 "
        onClick={() => MultipleopenFileWindow(uploader)}
      >
        <p className=" text-5 text-primary uppercase text-center">
          Drop Or Select Images
        </p>
        <MuiIcon name="Upload" sx={{ fontSize: 70 }} color="primary" />
      </div>
      <div className=" flex md:justify-start justify-center md:items-start gap-3 flex-wrap">
        {Files?.length > 0 &&
          Files.map((file, index) => (
            <div
              key={index}
              className=" relative   border-[2px] border-primary p-1 rounded-md"
            >
              <div className="absolute left-1/2 -top-3 -translate-x-1/2">
                <IconButton
                  onClick={() => deleteFile(index)}
                  sx={{
                    backgroundColor: '#fff',
                    ':hover': { backgroundColor: '#fff' },
                  }}
                >
                  <MuiIcon name="Delete" color="error" />
                </IconButton>
              </div>
              <img
                src={imagePreviews[index]}
                alt={file.name}
                className=" rounded-md object-cover  lg:h-[150px] lg:w-[150px] h-[100px] w-[100px] "
              />
            </div>
          ))}
        {urls &&
          urls?.map((item, index) => {
            return (
              <div
                key={index}
                className=" relative   border-[2px] border-primary p-1 rounded-md"
              >
                <div className="absolute left-1/2 -top-3 -translate-x-1/2">
                  <IconButton
                    onClick={() => deleteUrl(index)}
                    sx={{
                      backgroundColor: '#fff',
                      ':hover': { backgroundColor: '#fff' },
                    }}
                  >
                    <MuiIcon name="Delete" color="error" />
                  </IconButton>
                </div>
                <img
                  src={item as string}
                  className=" rounded-md object-cover  lg:h-[150px] lg:w-[150px] h-[100px] w-[100px] "
                />
              </div>
            );
          })}
      </div>
      <div className="  text-[10px]"> Powered By IT-Trendco</div>
    </div>
  );
}

export default MultiFileUploader;

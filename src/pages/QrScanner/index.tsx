import { Scanner } from '@yudiel/react-qr-scanner';
import React from 'react';
import InvitationScan from './InvitationScan';
import { Checkbox, FormLabel } from '@mui/material';

function QrScanner() {
  const [result, setResult] = React.useState('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>('');
  const [auto, setAuto] = React.useState(false);

  const requestCameraPermission = async () => {
    try {
      // Request permission to access the camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // If permission is granted, stop the stream
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <>
      <InvitationScan id={id} open={open} setOpen={setOpen} auto={auto} />
      <div className=" mt-5">
        <h1 className=" text-5 text-white">
          Scannen Sie QR-Codes und überprüfen Sie die Einladungen Ihrer VIPs
        </h1>
        <div className=" flex items-center gap-3 bg-white  text-primary p-3 mt-7">
          <Checkbox checked={auto} onClick={() => setAuto(!auto)} />
          <FormLabel>Auto Accept Invitation</FormLabel>
        </div>
        <Scanner
          components={{ tracker: true, count: true, torch: true, onOff: true }}
          options={{
            constraints: { facingMode: 'environment' },
          }}
          enabled
          onResult={(text, result) => {
            setId(text);
            setOpen(true);
          }}
          onError={(error) => console.log(error?.message)}
        />
        {result}
      </div>
    </>
  );
}

export default QrScanner;

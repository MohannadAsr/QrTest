import React from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

function QrScanner() {
  const [result, setResult] = React.useState('');

  const handleError = (err) => {
    console.error(err);
  };

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
    <div>
      <h1 className=" text-5 text-white">
        Scannen Sie QR-Codes und überprüfen Sie die Einladungen Ihrer VIPs
      </h1>

      <Scanner
        components={{ tracker: true, count: true, torch: true, onOff: true }}
        options={{
          constraints: { facingMode: 'environment' },
        }}
        enabled
        onResult={(text, result) => {
          setResult(text);
        }}
        onError={(error) => console.log(error?.message)}
      />
      <p className=" text-center text-success">in development mode</p>
    </div>
  );
}

export default QrScanner;

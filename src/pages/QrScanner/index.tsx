import React from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

function QrScanner() {
  const [result, setResult] = React.useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

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
      <Scanner
        options={{ constraints: { width: 100 } }}
        enabled
        onResult={(text, result) => console.log(text, result)}
        onError={(error) => console.log(error?.message)}
      />
      <p>Result: {result}</p>
    </div>
  );
}

export default QrScanner;

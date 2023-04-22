// components/QrCode.tsx
import { useEffect, useState } from 'react';
import Image from 'next/image';

const QrCode = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [expirationTime, setExpirationTime] = useState<number | null>(null);

  const fetchQrCode = async () => {
    try {
      const res = await fetch('/api/whatsapp/qr');
      const data = await res.json();
      const blob = await (await fetch(data.qr)).blob();
      const objectUrl = URL.createObjectURL(blob);
      setQrCode(objectUrl);
      setExpirationTime(Date.now() + 20 * 1000); // 20 seconds from now
    } catch (error) {
      console.error('Error fetching QR Code:', error);
    }
  };

  useEffect(() => {
    fetchQrCode();

    if (expirationTime) {
      const timer = setTimeout(() => {
        fetchQrCode();
      }, expirationTime - Date.now());

      return () => clearTimeout(timer);
    }
  }, [expirationTime]);

  return (
    <div>
      {qrCode ? (
        <Image src={qrCode} alt="QR Code" width={200} height={200} />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default QrCode;

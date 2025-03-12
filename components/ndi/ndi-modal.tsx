'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QRCode from 'qrcode';

const BhutanNDIButton = ({ text, onClick }) => {
  return (
    <Button onClick={onClick} style={{ pointerEvents: "auto" }} className="w-[250px] h-[50px] bg-[#124143] hover:bg-[#124143] text-white text-md font-semibold flex items-center justify-center space-x-2 shadow-md">
      <img src="/images/ndi_logo.png" alt="Bhutan NDI Logo" className="h-6 w-6" />
      <span>{text}</span>
    </Button>
  );
};

const BhutanNDIPopup = ({ isOpen, onClose, setNdiSuccess, setNdiData, setIsPopupOpen}) => {
  const [proofRequestURL, setProofRequestURL] = useState('');
  const [proofRequestThreadId, setProofRequestThreadId] = useState();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch proofRequestURL on popup open
  useEffect(() => {
    const fetchProofRequestData = async () => {
      setLoading(true);
      try {
        // 🔹 Log when fetch starts

        const response = await fetch('http://localhost:3000/api/ndi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch proof request data');
        }

        const data = await response.json();


        setProofRequestURL(data.proofRequest.proofRequestURL);
        setProofRequestThreadId(data.proofRequest.proofRequestThreadId);
      } catch (error) {
        console.error('Error fetching proof request:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProofRequestData();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;

    if (proofRequestURL && proofRequestThreadId) {
      // Generate QR code from proofRequestURL
      QRCode.toDataURL(proofRequestURL)
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Error generating QR code:', err));

      // Start polling for proof verification
      interval = setInterval(async () => {
        try {
    
          const res = await fetch(`/api/ndi?threadId=${proofRequestThreadId}`);
          const data = await res.json();
          // 🔹 Log verification data

          if (data.ndiSuccess) {
            setNdiData(data.proofData);
            setNdiSuccess(true);
            clearInterval(interval); // Stop polling on success
            setIsPopupOpen(false);
          }
        } catch (error) {
          console.error('Error fetching proof status:', error);
        }
      }, 2000); // Poll every 3 seconds
    }

    return () => clearInterval(interval);
  }, [proofRequestURL, proofRequestThreadId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Scan with <span className="text-[#5AC994]"> Bhutan NDI</span> Wallet
          </DialogTitle>
        </DialogHeader>
        <Card className="border-2 border-[#5AC994] rounded-lg p-4 flex justify-center">
          <CardContent className="flex justify-center">
            {loading ? (
              <p>Loading QR Code...</p>
            ) : qrCodeDataUrl ? (
              <img src={qrCodeDataUrl} alt="QR Code" width={200} height={200} />
            ) : (
              <p>No QR code available</p>
            )}
          </CardContent>
        </Card>
        <div className="flex items-center justify-center">
          <p className="text-gray-400 text-sm text-center mt-4 mb-2">
            1. Open Bhutan NDI Wallet on your phone
            <br />
            2. Tap the Scan button and capture the code
          </p>
          <Image src="/images/ndi_scanqr.png" alt="Scan QR" width={25} height={25} />
        </div>

        <div className="w-full flex items-center justify-center">
          <Button
            onClick={() => window.open("https://www.youtube.com/@BhutanNDI", "_blank")}
            className="bg-[#5AC994] hover:bg-[#5AC994] text-white flex items-center space-x-2 px-4 py-2 rounded"
          >
            <span>Watch video guide</span>
            <Image src="/images/ndi_play.png" alt="Play" width={18} height={18} />
          </Button>
        </div>

        <p className="text-gray-400 mt-2 text-sm text-center">Download now!</p>
        <div className="flex justify-center space-x-4">
          <a href="https://play.google.com/store/search?q=bhutan%20ndi&c=apps&hl=en_IN&gl=US" target="_blank">
            <Image src="/images/gpl.png" alt="Google Play" width={120} height={40} />
          </a>
          <a href="https://apps.apple.com/in/app/bhutan-ndi/id1645493166" target="_blank">
            <Image src="/images/apl.png" alt="App Store" width={120} height={40} />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BhutanNDIComponent = ({ setNdiSuccess, setNdiData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);



  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <Dialog>
        <DialogTrigger asChild>
          <BhutanNDIButton text="Login with Bhutan NDI" onClick={() => setIsPopupOpen(true)} />
        </DialogTrigger>
      </Dialog>
      <BhutanNDIPopup setIsPopupOpen={setIsPopupOpen} setNdiData={setNdiData} setNdiSuccess={setNdiSuccess} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default BhutanNDIComponent;

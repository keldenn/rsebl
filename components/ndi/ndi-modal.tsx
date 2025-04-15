'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QRCode from 'qrcode';
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://newrsebl.org.bt:8080"
    : "http://localhost:3000"; // Empty means relative path in development
    
const BhutanNDIButton = ({ text, onClick }) => {
  return (
    <Button type="button" onClick={onClick} style={{ pointerEvents: "auto" }} className="h-[50px] bg-[#124143] hover:bg-[#124143] text-white text-md font-semibold flex items-center justify-center space-x-2 shadow-md">
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
  const [deepLinkURL, setDeeplinkURL] = useState();

  // Fetch proofRequestURL on popup open
  useEffect(() => {
    const fetchProofRequestData = async () => {
      setLoading(true);
      try {
        // 🔹 Log when fetch starts

        const response = await fetch(`${API_BASE_URL}/api/ndi`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch proof request data');
        }

        const data = await response.json();

        setDeeplinkURL(data.proofRequest.deepLinkURL);
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
      QRCode.toDataURL(proofRequestURL, {
        width: 300,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        }
      }).then(qrUrl => {
        // Create img elements instead of using `new Image()`
        const qrImage = document.createElement("img");
        const logoImage = document.createElement("img");
      
        qrImage.src = qrUrl;
        logoImage.src = "/images/ndi_qr_logo.png"; // Ensure this path is correct
      
        // Wait for both images to load before drawing
        qrImage.onload = () => {
          logoImage.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
      
            canvas.width = 300;
            canvas.height = 300;
      
            // Draw QR code on canvas
            ctx.drawImage(qrImage, 0, 0, 300, 300);
      
            // Define logo size and white border size
            const logoSize = 60; // Logo size
            const borderSize = 80; // White circular border size
      
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
      
            // Draw white circular border
            ctx.beginPath();
            ctx.arc(centerX, centerY, borderSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff"; // White color
            ctx.fill();
      
            // Draw logo at the center
            ctx.drawImage(logoImage, centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize);
      
            // Convert the final image to a Data URL
            setQrCodeDataUrl(canvas.toDataURL());
          };
        };
      
        qrImage.onerror = (err) => console.error("Error loading QR code image:", err);
        logoImage.onerror = (err) => console.error("Error loading logo image:", err);
      }).catch(err => console.error("Error generating QR code:", err));
      
      
      

      // Start polling for proof verification
      interval = setInterval(async () => {
        try {
    
          const res = await fetch(`${API_BASE_URL}/api/ndi?threadId=${proofRequestThreadId}`);
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
      }, 6000); // Poll every 3 seconds
    }

    return () => clearInterval(interval);
  }, [proofRequestURL, proofRequestThreadId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg text-center">
            Scan with <span className="text-[#5AC994]"> Bhutan NDI</span> Wallet
          </DialogTitle>
        </DialogHeader>
        <Card className="border-3 border-[#5AC994] rounded-lg mx-11 flex justify-center">
        <CardContent className="flex justify-center items-center p-0 ">
            {loading ? (
              <div className="flex justify-center items-center w-[300px] h-[300px]">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-[#5AC994]"></div>
            </div>
            ) : qrCodeDataUrl ? (
                <div className='p-4'>
                 <img src={qrCodeDataUrl} alt="QR Code"  width={300} height={300} />
                </div>
            ) : (
                <div className="flex justify-center items-center w-[300px] h-[300px]">
                       <p>No QR code available</p>
              </div>
       
            )}
          </CardContent>
        </Card>
        <div className="flex items-center justify-center">
          <p className="text-gray-400 text-sm text-center mb-2 mr-2">
            1. Open Bhutan NDI Wallet on your phone
            <br />
            2. Tap the Scan button and capture the code
          </p>
          <Image src="/images/ndi_scanqr.png" alt="Scan QR" width={25} height={25} />
        </div>
        <div className="flex items-center my-2 mx-6">
          <hr className="flex-grow border-gray-300 dark:border-white" />
          <span className="mx-2 text-gray-500 dark:text-white font-medium">OR</span>
          <hr className="flex-grow border-gray-300 dark:border-white" />
        </div>

        <div className="text-center text-gray-400 text-sm">
          Open{" "}
          <span className="text-[#5AC994] font-semibold">Bhutan NDI</span> Wallet{" "}
          <a
            href= {`${deepLinkURL}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            here
          </a>
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

const BhutanNDIComponent = ({ setNdiSuccess, setNdiData, btnText }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <Dialog>
        <DialogTrigger asChild>
        <BhutanNDIButton
            text={btnText}
            onClick={(e) => {
              e.preventDefault(); // Prevent default behavior
              setIsPopupOpen(true);
            }}
          />
        </DialogTrigger>
      </Dialog>
      <BhutanNDIPopup setIsPopupOpen={setIsPopupOpen} setNdiData={setNdiData} setNdiSuccess={setNdiSuccess} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default BhutanNDIComponent;

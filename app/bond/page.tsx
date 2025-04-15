'use client';

import BhutanNDIComponent from "../../components/ndi/ndi-modal";
import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function Page() {
  const [ndiSuccess, setNdiSuccess] = useState(false);
  const [ndiData, setNdiData] = useState<{idNumber: string; fullName: string} | null>(null);
  const [auctionStatus, setAuctionStatus] = useState<'pending' | 'open' | 'closed'>('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Check auction time status on component mount
  useEffect(() => {
    checkAuctionTime();
  }, []);

  const checkAuctionTime = () => {
    const now = new Date();
    const auctionStart = new Date('2024-11-13T09:30:00');
    const auctionEnd = new Date('2025-11-18T15:00:00');

    if (now < auctionStart) {
      setAuctionStatus('pending');
    } else if (now > auctionEnd) {
      setAuctionStatus('closed');
    } else {
      setAuctionStatus('open');
    }
  };

  const handleContinueApplication = async () => {
    if (!ndiData) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate checking if CID has valid CD code
      const response = await validateCID(ndiData.idNumber);
      
      if (response.valid) {
        // If valid, proceed to bidding form
        router.push('/bond/application-form');
      } else {
        setError('Sorry, this CID does not have a valid CD Code. Please contact one of the registered brokers to create an account.');
      }
    } catch (err) {
      setError('An error occurred while processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mock function to validate CID - replace with actual API call
  const validateCID = async (cid: string): Promise<{valid: boolean}> => {
    // In a real app, this would be an API call to your backend
    return new Promise(resolve => {
      setTimeout(() => {
        // Simple validation - in reality, check against your database
        resolve({ valid: cid.length === 11 });
      }, 1000);
    });
  };

  // Log IP address
  useEffect(() => {
    const logIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('User IP:', data.ip); // In production, send this to your backend
      } catch (err) {
        console.error('Failed to get IP:', err);
      }
    };
    
    logIP();
  }, []);

  if (auctionStatus === 'pending') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gelephu Mindfulness City Bond</h2>
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            <p>The bond application will open on: <strong>13th November 2024</strong> at <strong>09:30 AM</strong>.</p>
          </div>
        </div>
      </div>
    );
  }

  if (auctionStatus === 'closed') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gelephu Mindfulness City Bond</h2>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p>The bond application has ended as of <strong>18th November 2024</strong> at <strong>03:00 PM</strong>.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-custom-1"></div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => setError(null)} 
              className="absolute top-0 right-0 px-2 py-1"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{success}</span>
            <button 
              onClick={() => setSuccess(null)} 
              className="absolute top-0 right-0 px-2 py-1"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Background SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#f3f4f6"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,112C672,128,768,192,864,213.3C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Gelephu Mindfulness City <span className="text-custom-1">Bond</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sovereign-backed investment for Bhutan's sustainable future
          </p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Left Column - Benefits */}
          <div className="w-full lg:w-1/2 max-w-xl">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 relative">
                <span className="absolute -left-8 top-3 h-12 w-2 bg-custom-1 rounded-full"></span>
                Investment Highlights
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-custom-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Government Guaranteed</h3>
                    <p className="mt-1 text-gray-600">Backed by the Royal Government of Bhutan's sovereign guarantee</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-custom-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Attractive Returns</h3>
                    <p className="mt-1 text-gray-600">Competitive interest rates with regular payouts</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-custom-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Sustainable Impact</h3>
                    <p className="mt-1 text-gray-600">Funds development of Asia's first mindfulness city</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-1/2 max-w-md bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Identity</h2>
              <p className="text-gray-600">
                To proceed with your bond application, please verify with Bhutan NDI.
              </p>
            </div>

            <BhutanNDIComponent 
              btnText="Continue with NDI" 
              setNdiSuccess={setNdiSuccess} 
              setNdiData={setNdiData} 
              className="w-full py-3 px-6 bg-custom-1 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            />

            {/* Verification Success */}
            {ndiSuccess && ndiData && (
              <div className="mt-8 p-6 border border-green-200 bg-green-50 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-green-800">Identity Verified</h3>
                    <div className="mt-2 text-gray-700">
                      <p><span className="font-semibold">ID:</span> {ndiData.idNumber}</p>
                      <p><span className="font-semibold">Name:</span> {ndiData.fullName}</p>
                    </div>
                    <div className="mt-4">
                      <Button 
                        onClick={handleContinueApplication}
                        className="text-white bg-custom-1 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : 'Continue Application'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
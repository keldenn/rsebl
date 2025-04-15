'use client';

import BhutanNDIComponent from "../../components/ndi/ndi-modal"

import React from 'react'
import { useState, useEffect } from "react"


export default function page() {
    const[ndiSuccess, setNdiSuccess]=useState(false);
    const[ndiData, setNdiData]=useState();

  return (
    	<div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bhutan NDI Authentication</h1>

      {/* Bhutan NDI Login Button */}
      <BhutanNDIComponent btnText={"LOGIN WITH NDI"}setNdiSuccess={setNdiSuccess} setNdiData={setNdiData} />

      {/* Show verification results when successful */}
      {ndiSuccess && ndiData && (
        <div className="mt-6 p-4 border border-green-500 bg-green-100 rounded-md">
          <h2 className="text-lg font-semibold text-green-700">Verification Successful!</h2>
          <p><strong>ID Number:</strong> {ndiData.idNumber}</p>
          <p><strong>Full Name:</strong> {ndiData.fullName}</p>
        </div>
      )}
    </div>
  )
}


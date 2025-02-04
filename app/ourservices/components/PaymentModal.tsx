import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const PaymentModal = ({ isOpen, onClose, paymentData }) => {
  const handlePayment = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL;

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();  // This will redirect to the payment gateway in the background.
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 rounded-2xl shadow-lg bg-white">
        <DialogTitle className="text-xl font-semibold text-center mb-4">
          Confirm Your Payment
        </DialogTitle>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Order Number:</span>
            <span>{paymentData.bfs_orderNo}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span>{paymentData.bfs_txnAmount} BTN</span>
          </div>
          <div className="flex justify-between">
            <span>Description:</span>
            <span>{paymentData.bfs_paymentDesc}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handlePayment}>
            Pay Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;

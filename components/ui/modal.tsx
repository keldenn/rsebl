import React from "react";
import { Button } from "./button";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageUrl?: string;
  pdfUrl?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  imageUrl,
  pdfUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative">
        {/* Header with Title and Close Button */}
        <div className="flex justify-between items-center mb-4">
          {/* Title */}
          <h2 className="text-xl font-medium">{title}</h2>
          {/* Close Button */}
          <button
            className="text-gray-500 hover:text-black text-lg"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full object-cover h-60 rounded-lg mb-4"
          />
        )}

        {/* Description */}
        <p className="text-gray-700 mb-9">{description}</p>

        {/* Download PDF button */}
        {pdfUrl && (
             <Button
               variant="outline"
               size="sm"
               className="absolute bottom-4 right-4 z-10 "
             >
               <a href={pdfUrl} download>
                 Download PDF
               </a>
             </Button>
        )}
      </div>
    </div>
  );
};

export default Modal;

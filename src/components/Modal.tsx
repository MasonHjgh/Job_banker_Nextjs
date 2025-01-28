import React from 'react';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen,closeModal, children }: Props) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-2xl">
        {children}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
          onClick={closeModal}>
          ✕
        </button>
      </div>
    </div>
  );
}

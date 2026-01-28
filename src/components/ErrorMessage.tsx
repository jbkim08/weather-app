import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 p-4 mb-6 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl text-white max-w-md mx-auto animate-fadeIn">
      <AlertCircle className="w-5 h-5 shrink-0 text-red-200" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

import React from 'react';

type Props = {
  label: string;
  onClick: () => void;
  color?: string; // Tailwind background color classes
};

const QuickActionButton: React.FC<Props> = ({ label, onClick, color = 'bg-blue-600' }) => {
  return (
    <button
      onClick={onClick}
      className={`${color} w-full text-white py-3 px-4 rounded-lg font-medium text-sm hover:opacity-90 transition`}
    >
      {label}
    </button>
  );
};

export default QuickActionButton;

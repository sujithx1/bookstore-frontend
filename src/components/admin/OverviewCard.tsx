import React from 'react';

type Props = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
};

const OverviewCard: React.FC<Props> = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <h4 className="text-sm font-medium text-gray-600">{title}</h4>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default OverviewCard;

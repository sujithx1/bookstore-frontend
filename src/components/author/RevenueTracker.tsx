import React from "react";

const RevenueTracker: React.FC = () => (
  <div className="bg-white shadow-md rounded p-6 space-y-4">
    <div className="text-lg font-semibold">Current Month Revenue: ₹3,500</div>
    <div className="text-lg font-semibold">Current Year Revenue: ₹12,450</div>
    <button className="bg-green-600 text-white px-4 py-2 rounded">Send Monthly Revenue Email</button>
  </div>
);

export default RevenueTracker;

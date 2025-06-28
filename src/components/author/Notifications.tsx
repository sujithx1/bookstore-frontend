import {  CheckCircle, AlertTriangle, Info } from 'lucide-react';
import Sidebar from './SideBar';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'New Sale!',
      message: 'You sold 2 copies of "The Art of Programming".',
      date: '2024-06-25',
    },
    {
      id: 2,
      type: 'info',
      title: 'New Book Added',
      message: 'Your book "React Mastery" has been published.',
      date: '2024-06-24',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Low Inventory',
      message: '"Data Structures Simplified" is almost out of stock.',
      date: '2024-06-23',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>
      <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">🔔 Notifications</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y">
        {notifications.map((note) => (
          <div key={note.id} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition">
            <div className="mt-1">{getIcon(note.type)}</div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{note.title}</p>
              <p className="text-sm text-gray-600">{note.message}</p>
              <p className="text-xs text-gray-400 mt-1">{note.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
          </div>
    </>
  );
};

export default Notifications;

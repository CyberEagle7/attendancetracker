import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      employeeName: "Sarah Johnson",
      employeeId: "EMP001",
      action: "Check In",
      time: "09:15 AM",
      status: "on-time",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      employeeName: "Michael Chen",
      employeeId: "EMP002",
      action: "Check In",
      time: "09:45 AM",
      status: "late",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      employeeName: "Emily Rodriguez",
      employeeId: "EMP003",
      action: "Check Out",
      time: "06:30 PM",
      status: "on-time",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      employeeName: "David Wilson",
      employeeId: "EMP004",
      action: "Check In",
      time: "08:30 AM",
      status: "early",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      employeeName: "Lisa Thompson",
      employeeId: "EMP005",
      action: "Check In",
      time: "10:15 AM",
      status: "late",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'text-green-600 bg-green-100';
      case 'late':
        return 'text-red-600 bg-red-100';
      case 'early':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time':
        return 'CheckCircle';
      case 'late':
        return 'AlertCircle';
      case 'early':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View All
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-colors duration-150">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={activity?.avatar}
                  alt={activity?.employeeName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity?.employeeName}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    ({activity?.employeeId})
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activity?.action} at {activity?.time}
                </p>
              </div>

              <div className="flex-shrink-0">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity?.status)}`}>
                  <Icon name={getStatusIcon(activity?.status)} size={12} />
                  <span className="capitalize">{activity?.status?.replace('-', ' ')}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
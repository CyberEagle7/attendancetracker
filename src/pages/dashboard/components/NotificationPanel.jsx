import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationPanel = () => {
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pending Approvals',
      message: '5 leave requests awaiting your approval',
      time: '4 hours ago',
      isRead: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Monthly Report Ready',
      message: 'September attendance report has been generated',
      time: '1 day ago',
      isRead: true
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Meeting',
      date: 'Sep 15, 2025',
      time: '10:00 AM',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'HR Training Session',
      date: 'Sep 18, 2025',
      time: '2:00 PM',
      type: 'training'
    },
    {
      id: 3,
      title: 'Monthly Review',
      date: 'Sep 30, 2025',
      time: '3:00 PM',
      type: 'review'
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info':
        return { icon: 'Info', color: 'text-blue-600 bg-blue-100' };
      case 'warning':
        return { icon: 'AlertTriangle', color: 'text-yellow-600 bg-yellow-100' };
      case 'success':
        return { icon: 'CheckCircle', color: 'text-green-600 bg-green-100' };
      default:
        return { icon: 'Bell', color: 'text-gray-600 bg-gray-100' };
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'meeting':
        return 'Users';
      case 'training':
        return 'BookOpen';
      case 'review':
        return 'FileText';
      default:
        return 'Calendar';
    }
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Bell" size={16} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            </div>
            <button className="text-xs text-primary hover:text-primary/80 font-medium">
              Mark all read
            </button>
          </div>
        </div>

        <div className="divide-y divide-border max-h-64 overflow-y-auto">
          {notifications?.map((notification) => {
            const iconConfig = getNotificationIcon(notification?.type);
            return (
              <div key={notification?.id} className={`p-4 hover:bg-muted/50 transition-colors duration-150 ${!notification?.isRead ? 'bg-primary/5' : ''}`}>
                <div className="flex space-x-3">
                  <div className={`flex-shrink-0 p-1.5 rounded-full ${iconConfig?.color}`}>
                    <Icon name={iconConfig?.icon} size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground mb-1">
                      {notification?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {notification?.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification?.time}
                    </p>
                  </div>
                  {!notification?.isRead && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Upcoming Events */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Calendar" size={16} className="text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Upcoming Events</h3>
          </div>
        </div>

        <div className="divide-y divide-border">
          {upcomingEvents?.map((event) => (
            <div key={event?.id} className="p-4 hover:bg-muted/50 transition-colors duration-150">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 p-2 bg-muted rounded-lg">
                  <Icon name={getEventIcon(event?.type)} size={14} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground mb-1">
                    {event?.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{event?.date}</span>
                    <span>•</span>
                    <span>{event?.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
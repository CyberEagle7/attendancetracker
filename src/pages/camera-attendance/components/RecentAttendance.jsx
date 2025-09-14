import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentAttendance = ({ recentEntries, currentStats }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-success/10 text-success border-success/20';
      case 'Late':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Absent':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">Recent Attendance</h3>
            <p className="text-sm text-muted-foreground">Latest attendance entries</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-lg font-semibold text-foreground">
            {new Date()?.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      {/* Current Session Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-success">{currentStats?.present}</p>
          <p className="text-xs text-muted-foreground">Present</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-warning">{currentStats?.late}</p>
          <p className="text-xs text-muted-foreground">Late</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{currentStats?.total}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
      </div>
      {/* Recent Entries List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {recentEntries?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No recent attendance entries</p>
            <p className="text-xs text-muted-foreground mt-1">
              Entries will appear here as employees mark attendance
            </p>
          </div>
        ) : (
          recentEntries?.map((entry) => (
            <div
              key={entry?.id}
              className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors duration-150"
            >
              <div className="flex-shrink-0">
                <Image
                  src={entry?.avatar}
                  alt={entry?.employeeName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {entry?.employeeName}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {entry?.employeeId}
                </p>
              </div>
              
              <div className="flex-shrink-0 text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(entry?.status)}`}>
                  {entry?.status}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(entry?.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* View All Link */}
      {recentEntries?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors duration-150 flex items-center justify-center space-x-2">
            <span>View All Attendance Records</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentAttendance;
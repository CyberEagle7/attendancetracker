import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceConfirmation = ({ attendanceData, onClose, onMarkAnother }) => {
  if (!attendanceData) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          {/* Status Header */}
          <div className="flex items-center justify-center mb-6">
            <div className={`p-3 rounded-full border ${getStatusColor(attendanceData?.status)}`}>
              <Icon 
                name={getStatusIcon(attendanceData?.status)} 
                size={32} 
                className={attendanceData?.status === 'success' ? 'text-success' : 
                          attendanceData?.status === 'warning' ? 'text-warning' : 
                          attendanceData?.status === 'error' ? 'text-error' : 'text-muted-foreground'} 
              />
            </div>
          </div>

          {/* Title and Message */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {attendanceData?.title}
            </h3>
            <p className="text-muted-foreground">
              {attendanceData?.message}
            </p>
          </div>

          {/* Attendance Details */}
          {attendanceData?.status === 'success' && (
            <div className="bg-muted/30 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Employee</span>
                <span className="text-sm font-medium text-foreground">{attendanceData?.employeeName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Employee ID</span>
                <span className="text-sm font-mono text-foreground">{attendanceData?.employeeId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Time</span>
                <span className="text-sm font-medium text-foreground">{attendanceData?.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-md ${
                  attendanceData?.attendanceStatus === 'Present' ? 'bg-success/10 text-success' :
                  attendanceData?.attendanceStatus === 'Late'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                }`}>
                  {attendanceData?.attendanceStatus}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {attendanceData?.status === 'success' && (
              <Button
                variant="outline"
                onClick={onMarkAnother}
                iconName="Plus"
                iconPosition="left"
                fullWidth
              >
                Mark Another
              </Button>
            )}
            <Button
              variant={attendanceData?.status === 'success' ? 'default' : 'outline'}
              onClick={onClose}
              iconName={attendanceData?.status === 'success' ? 'Home' : 'X'}
              iconPosition="left"
              fullWidth
            >
              {attendanceData?.status === 'success' ? 'Go to Dashboard' : 'Close'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceConfirmation;
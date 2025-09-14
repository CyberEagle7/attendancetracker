import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Mark Attendance',
      icon: 'Camera',
      variant: 'default',
      path: '/camera-attendance',
      description: 'Scan QR code to mark attendance'
    },
    {
      label: 'Generate QR Code',
      icon: 'QrCode',
      variant: 'outline',
      path: '/qr-code-generation',
      description: 'Create QR codes for users'
    },
    {
      label: 'View Records',
      icon: 'FileText',
      variant: 'secondary',
      path: '/attendance-records',
      description: 'Access attendance history'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Button iconName="Zap" size="icon" variant="ghost" className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions?.map((action, index) => (
          <div key={index} className="group">
            <Button
              variant={action?.variant}
              iconName={action?.icon}
              iconPosition="left"
              fullWidth
              onClick={() => navigate(action?.path)}
              className="h-auto p-4 flex-col items-start text-left hover-scale"
            >
              <span className="font-medium mb-1">{action?.label}</span>
              <span className="text-xs opacity-75 font-normal">{action?.description}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Storage',
      description: 'All personal information is stored securely'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'We never share your information with third parties'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ShieldCheck" size={20} color="var(--color-success)" />
        <h3 className="text-sm font-semibold text-foreground">Security & Privacy</h3>
      </div>
      <div className="space-y-3">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name={feature?.icon} size={16} color="var(--color-success)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span className="text-xs text-muted-foreground">SSL</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={16} color="var(--color-success)" />
            <span className="text-xs text-muted-foreground">Encrypted</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Check" size={16} color="var(--color-success)" />
            <span className="text-xs text-muted-foreground">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;
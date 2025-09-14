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
      title: 'Secure Login',
      description: 'Multi-factor authentication available'
    },
    {
      icon: 'Database',
      title: 'Data Protection',
      description: 'GDPR compliant data handling'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Your Security is Our Priority
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-150"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={16} color="var(--color-success)" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-1">
          <Icon name="CheckCircle" size={14} color="var(--color-success)" />
          <span className="text-xs text-muted-foreground">Verified Secure</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} color="var(--color-primary)" />
          <span className="text-xs text-muted-foreground">24/7 Monitoring</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;
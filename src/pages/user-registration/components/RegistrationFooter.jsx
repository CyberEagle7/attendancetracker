import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="text-center space-y-4">
      {/* Terms and Privacy */}
      <div className="text-xs text-muted-foreground space-y-2">
        <p>
          By creating an account, you agree to our{' '}
          <button className="text-primary hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 h-px bg-border"></div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span className="text-xs text-muted-foreground">Secure Registration</span>
        </div>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      {/* Copyright */}
      <div className="text-xs text-muted-foreground">
        <p>&copy; {currentYear} AttendanceTracker. All rights reserved.</p>
      </div>

      {/* Help Text */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Need Help?</p>
            <p className="text-xs text-muted-foreground mt-1">
              Contact your system administrator or HR department for assistance with account creation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFooter;
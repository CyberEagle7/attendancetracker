import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="UserPlus" size={32} color="white" />
        </div>
      </div>

      {/* Title and Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Join our attendance management system. Fill in your details below to get started.
        </p>
      </div>

      {/* Back to Login Link */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-muted-foreground">Already have an account?</span>
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate('/login')}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default RegistrationHeader;
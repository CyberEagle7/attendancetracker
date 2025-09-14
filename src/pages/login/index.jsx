import React from 'react';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Main Login Card */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-8">
          {/* Welcome Header */}
          <WelcomeHeader />
          
          {/* Login Form */}
          <LoginForm />
          
          {/* Security Badges */}
          <SecurityBadges />
        </div>
        
        {/* Footer Information */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} AttendanceTracker. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors duration-150">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors duration-150">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors duration-150">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import Header from '../../components/ui/Header';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SecurityBadges from './components/SecurityBadges';
import RegistrationFooter from './components/RegistrationFooter';

const UserRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column - Registration Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
                  <div className="space-y-8">
                    <RegistrationHeader />
                    <RegistrationForm />
                  </div>
                </div>
              </div>

              {/* Right Column - Security Info */}
              <div className="order-1 lg:order-2 space-y-8">
                <div className="text-center lg:text-left space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    Secure & Simple Registration
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Create your account in minutes with our streamlined registration process. 
                    Your information is protected with enterprise-grade security.
                  </p>
                </div>

                <SecurityBadges />

                <div className="hidden lg:block">
                  <RegistrationFooter />
                </div>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="lg:hidden mt-8">
              <RegistrationFooter />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistration;
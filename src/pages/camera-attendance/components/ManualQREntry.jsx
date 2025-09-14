import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ManualQREntry = ({ onQRCodeSubmit, isProcessing }) => {
  const [qrCode, setQRCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError('');
    
    if (!qrCode?.trim()) {
      setError('Please enter a QR code');
      return;
    }
    
    if (qrCode?.length < 8) {
      setError('QR code must be at least 8 characters long');
      return;
    }
    
    onQRCodeSubmit(qrCode?.trim());
  };

  const handleInputChange = (e) => {
    setQRCode(e?.target?.value);
    if (error) setError('');
  };

  const sampleCodes = [
    'EMP001-2025-09-14',
    'EMP002-2025-09-14',
    'EMP003-2025-09-14'
  ];

  const handleSampleCodeClick = (code) => {
    setQRCode(code);
    setError('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <Icon name="Keyboard" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-foreground">Manual QR Entry</h3>
          <p className="text-sm text-muted-foreground">Enter QR code manually if camera is unavailable</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="QR Code"
          type="text"
          placeholder="Enter QR code (e.g., EMP001-2025-09-14)"
          value={qrCode}
          onChange={handleInputChange}
          error={error}
          disabled={isProcessing}
          className="font-mono"
        />

        <Button
          type="submit"
          variant="default"
          loading={isProcessing}
          disabled={!qrCode?.trim() || isProcessing}
          iconName="Check"
          iconPosition="left"
          fullWidth
        >
          {isProcessing ? 'Processing...' : 'Mark Attendance'}
        </Button>
      </form>
      {/* Sample QR Codes for Testing */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Sample QR Codes (for testing)</h4>
        <div className="space-y-2">
          {sampleCodes?.map((code, index) => (
            <button
              key={index}
              onClick={() => handleSampleCodeClick(code)}
              className="w-full text-left p-2 bg-muted/50 hover:bg-muted rounded-md transition-colors duration-150 text-sm font-mono text-muted-foreground hover:text-foreground"
              disabled={isProcessing}
            >
              {code}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Click any sample code above to test the attendance marking functionality
        </p>
      </div>
    </div>
  );
};

export default ManualQREntry;
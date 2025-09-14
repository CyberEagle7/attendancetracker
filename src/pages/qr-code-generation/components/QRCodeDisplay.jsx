import React from 'react';
import QRCode from 'react-qr-code';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeDisplay = ({ qrData, onDownload, onPrint, onShare }) => {
  if (!qrData) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="QrCode" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No QR Code Generated</h3>
        <p className="text-muted-foreground">Select a user and generate a QR code to display it here</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Generated QR Code</h3>
        <p className="text-sm text-muted-foreground">Scan this code to mark attendance</p>
      </div>
      {/* QR Code Display */}
      <div className="bg-white p-6 rounded-lg border-2 border-border mb-6 flex justify-center">
        <QRCode
          value={qrData?.qrString}
          size={200}
          level="H"
          includeMargin={true}
          fgColor="#000000"
          bgColor="#FFFFFF"
        />
      </div>
      {/* QR Code Metadata */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-foreground">User:</span>
            <span className="ml-2 text-muted-foreground">{qrData?.userName}</span>
          </div>
          <div>
            <span className="font-medium text-foreground">Employee ID:</span>
            <span className="ml-2 text-muted-foreground">{qrData?.employeeId}</span>
          </div>
          <div>
            <span className="font-medium text-foreground">Generated:</span>
            <span className="ml-2 text-muted-foreground">{qrData?.generatedAt}</span>
          </div>
          <div>
            <span className="font-medium text-foreground">Valid Until:</span>
            <span className="ml-2 text-muted-foreground">{qrData?.validUntil}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="font-medium text-foreground">Event Type:</span>
            <span className="ml-2 text-muted-foreground">{qrData?.eventType}</span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
          onClick={onDownload}
          className="flex-1 sm:flex-none"
        >
          Download
        </Button>
        <Button
          variant="outline"
          iconName="Printer"
          iconPosition="left"
          onClick={onPrint}
          className="flex-1 sm:flex-none"
        >
          Print
        </Button>
        <Button
          variant="outline"
          iconName="Share2"
          iconPosition="left"
          onClick={onShare}
          className="flex-1 sm:flex-none"
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
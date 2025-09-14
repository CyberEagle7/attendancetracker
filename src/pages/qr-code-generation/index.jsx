import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import QRGenerationForm from './components/QRGenerationForm';
import QRCodeDisplay from './components/QRCodeDisplay';
import QRCodeHistory from './components/QRCodeHistory';
import BulkGenerationModal from './components/BulkGenerationModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QRCodeGeneration = () => {
  const [currentQRData, setCurrentQRData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');

  const generateQRString = (userData) => {
    const timestamp = new Date()?.toISOString();
    const qrData = {
      userId: userData?.employeeId,
      userName: userData?.userName,
      eventType: userData?.eventType,
      timestamp: timestamp,
      validUntil: new Date(Date.now() + (parseInt(userData.validityDuration) * 60 * 60 * 1000))?.toISOString(),
      customNote: userData?.customNote || ''
    };
    return JSON.stringify(qrData);
  };

  const handleQRGenerate = async (userData) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (userData?.isBulk) {
      setIsBulkModalOpen(true);
      setIsGenerating(false);
      return;
    }

    const qrString = generateQRString(userData);
    const now = new Date();
    const validUntil = new Date(now.getTime() + (parseInt(userData.validityDuration) * 60 * 60 * 1000));

    const qrData = {
      qrString,
      userName: userData?.userName,
      employeeId: userData?.employeeId,
      eventType: userData?.eventType?.charAt(0)?.toUpperCase() + userData?.eventType?.slice(1)?.replace('-', ' '),
      generatedAt: now?.toLocaleString(),
      validUntil: validUntil?.toLocaleString(),
      customNote: userData?.customNote
    };

    setCurrentQRData(qrData);
    setIsGenerating(false);
  };

  const handleBulkGenerate = async (bulkData) => {
    setIsGenerating(true);
    
    // Simulate bulk generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, show the first user's QR code
    if (bulkData?.users?.length > 0) {
      const firstUser = bulkData?.users?.[0];
      const userData = {
        userName: firstUser?.name,
        employeeId: firstUser?.employeeId,
        eventType: bulkData?.settings?.eventType,
        validityDuration: bulkData?.settings?.validityDuration
      };
      
      const qrString = generateQRString(userData);
      const now = new Date();
      const validUntil = new Date(now.getTime() + (parseInt(userData.validityDuration) * 60 * 60 * 1000));

      const qrData = {
        qrString,
        userName: userData?.userName,
        employeeId: userData?.employeeId,
        eventType: userData?.eventType?.charAt(0)?.toUpperCase() + userData?.eventType?.slice(1)?.replace('-', ' '),
        generatedAt: now?.toLocaleString(),
        validUntil: validUntil?.toLocaleString(),
        isBulk: true,
        totalGenerated: bulkData?.users?.length
      };

      setCurrentQRData(qrData);
    }
    
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!currentQRData) return;
    
    // Create a canvas to draw the QR code and download it
    const canvas = document.createElement('canvas');
    const ctx = canvas?.getContext('2d');
    canvas.width = 300;
    canvas.height = 400;
    
    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
    
    // Add text information
    ctx.fillStyle = '#000000';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    
    ctx?.fillText(`QR Code for ${currentQRData?.userName}`, canvas?.width / 2, 30);
    ctx?.fillText(`Employee ID: ${currentQRData?.employeeId}`, canvas?.width / 2, 50);
    ctx?.fillText(`Event: ${currentQRData?.eventType}`, canvas?.width / 2, 70);
    ctx?.fillText(`Generated: ${currentQRData?.generatedAt}`, canvas?.width / 2, 370);
    ctx?.fillText(`Valid Until: ${currentQRData?.validUntil}`, canvas?.width / 2, 390);
    
    // Download the canvas as image
    const link = document.createElement('a');
    link.download = `qr-code-${currentQRData?.employeeId}-${Date.now()}.png`;
    link.href = canvas?.toDataURL();
    link?.click();
  };

  const handlePrint = () => {
    if (!currentQRData) return;
    
    const printWindow = window.open('', '_blank');
    printWindow?.document?.write(`
      <html>
        <head>
          <title>QR Code - ${currentQRData?.userName}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .qr-container { margin: 20px auto; }
            .info { margin: 10px 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <h2>Attendance QR Code</h2>
          <div class="info"><strong>User:</strong> ${currentQRData?.userName}</div>
          <div class="info"><strong>Employee ID:</strong> ${currentQRData?.employeeId}</div>
          <div class="info"><strong>Event Type:</strong> ${currentQRData?.eventType}</div>
          <div class="qr-container">
            <div id="qr-code"></div>
          </div>
          <div class="info"><strong>Generated:</strong> ${currentQRData?.generatedAt}</div>
          <div class="info"><strong>Valid Until:</strong> ${currentQRData?.validUntil}</div>
        </body>
      </html>
    `);
    printWindow?.document?.close();
    printWindow?.print();
  };

  const handleShare = async () => {
    if (!currentQRData) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QR Code for ${currentQRData?.userName}`,
          text: `Attendance QR Code for ${currentQRData?.userName} (${currentQRData?.employeeId})`,
          url: window.location?.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `QR Code for ${currentQRData?.userName} (${currentQRData?.employeeId})\nEvent: ${currentQRData?.eventType}\nGenerated: ${currentQRData?.generatedAt}`;
      navigator.clipboard?.writeText(shareText);
      alert('QR code information copied to clipboard!');
    }
  };

  const handleRegenerate = (historyData) => {
    handleQRGenerate(historyData);
    setActiveTab('generate');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <Icon name="QrCode" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">QR Code Generation</h1>
                <p className="text-muted-foreground mt-1">Create and manage attendance QR codes for users</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('generate')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  activeTab === 'generate' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Generate
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  activeTab === 'history' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                History
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'generate' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Generation Form */}
              <div>
                <QRGenerationForm 
                  onGenerate={handleQRGenerate}
                  loading={isGenerating}
                />
              </div>

              {/* QR Code Display */}
              <div>
                <QRCodeDisplay
                  qrData={currentQRData}
                  onDownload={handleDownload}
                  onPrint={handlePrint}
                  onShare={handleShare}
                />
              </div>
            </div>
          ) : (
            <div>
              <QRCodeHistory onRegenerate={handleRegenerate} />
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                iconName="Users"
                iconPosition="left"
                onClick={() => setIsBulkModalOpen(true)}
              >
                Bulk Generate
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={handleDownload}
                disabled={!currentQRData}
              >
                Download Current
              </Button>
              <Button
                variant="outline"
                iconName="Printer"
                iconPosition="left"
                onClick={handlePrint}
                disabled={!currentQRData}
              >
                Print Current
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Bulk Generation Modal */}
      <BulkGenerationModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onGenerate={handleBulkGenerate}
      />
    </div>
  );
};

export default QRCodeGeneration;
import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const CameraFeed = ({ onQRCodeDetected, isScanning, onCameraError }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setCameraError(null);
      
      const mediaStream = await navigator.mediaDevices?.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef?.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef?.current?.play();
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraError('Unable to access camera. Please check permissions.');
      onCameraError(error);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream?.getTracks()?.forEach(track => track?.stop());
      setStream(null);
    }
  };

  const retryCamera = () => {
    stopCamera();
    startCamera();
  };

  // Mock QR code detection simulation
  useEffect(() => {
    if (!isScanning || !stream) return;

    const interval = setInterval(() => {
      // Simulate QR code detection with mock data
      const mockQRCodes = [
        'EMP001-2025-09-14',
        'EMP002-2025-09-14',
        'EMP003-2025-09-14'
      ];
      
      // Random chance of detecting a QR code (for demo purposes)
      if (Math.random() > 0.95) {
        const randomCode = mockQRCodes?.[Math.floor(Math.random() * mockQRCodes?.length)];
        onQRCodeDetected(randomCode);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isScanning, stream, onQRCodeDetected]);

  if (cameraError) {
    return (
      <div className="relative w-full h-96 bg-muted rounded-lg flex flex-col items-center justify-center">
        <Icon name="CameraOff" size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Camera Access Error</h3>
        <p className="text-sm text-muted-foreground text-center mb-4 max-w-sm">
          {cameraError}
        </p>
        <button
          onClick={retryCamera}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-150"
        >
          Retry Camera
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-sm text-muted-foreground">Starting camera...</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />
      
      <canvas
        ref={canvasRef}
        className="hidden"
      />
      
      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Scanning Frame */}
          <div className={`w-64 h-64 border-2 rounded-lg transition-colors duration-300 ${
            isScanning ? 'border-accent animate-pulse' : 'border-white/50'
          }`}>
            {/* Corner indicators */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-l-4 border-t-4 border-white rounded-tl-lg"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-r-4 border-t-4 border-white rounded-tr-lg"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-4 border-b-4 border-white rounded-bl-lg"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-4 border-b-4 border-white rounded-br-lg"></div>
          </div>
          
          {/* Scanning Line */}
          {isScanning && (
            <div className="absolute top-0 left-0 w-full h-1 bg-accent animate-bounce"></div>
          )}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
          <p className="text-white text-sm text-center">
            {isScanning ? 'Scanning for QR code...' : 'Position QR code within the frame'}
          </p>
        </div>
      </div>
      
      {/* Camera Controls */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={retryCamera}
          className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors duration-150"
          title="Refresh Camera"
        >
          <Icon name="RotateCcw" size={20} />
        </button>
      </div>
    </div>
  );
};

export default CameraFeed;
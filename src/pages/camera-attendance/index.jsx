import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CameraFeed from './components/CameraFeed';
import ManualQREntry from './components/ManualQREntry';
import AttendanceConfirmation from './components/AttendanceConfirmation';
import RecentAttendance from './components/RecentAttendance';
import ScanningInstructions from './components/ScanningInstructions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CameraAttendance = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [attendanceConfirmation, setAttendanceConfirmation] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [cameraAvailable, setCameraAvailable] = useState(true);

  // Mock data for recent attendance entries
  const [recentEntries] = useState([
    {
      id: 1,
      employeeName: "Sarah Johnson",
      employeeId: "EMP001",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "Present",
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 2,
      employeeName: "Michael Chen",
      employeeId: "EMP002",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "Late",
      timestamp: new Date(Date.now() - 600000) // 10 minutes ago
    },
    {
      id: 3,
      employeeName: "Emily Rodriguez",
      employeeId: "EMP003",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "Present",
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    }
  ]);

  // Mock current session statistics
  const currentStats = {
    present: 24,
    late: 3,
    total: 27
  };

  // Mock employee database
  const mockEmployees = {
    'EMP001-2025-09-14': {
      id: 'EMP001',
      name: 'Sarah Johnson',
      department: 'Engineering',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    'EMP002-2025-09-14': {
      id: 'EMP002',
      name: 'Michael Chen',
      department: 'Marketing',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    'EMP003-2025-09-14': {
      id: 'EMP003',
      name: 'Emily Rodriguez',
      department: 'Design',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  };

  const handleStartScanning = () => {
    setIsScanning(true);
    setShowInstructions(false);
  };

  const handleStopScanning = () => {
    setIsScanning(false);
    setShowInstructions(true);
  };

  const handleCameraError = (error) => {
    console.error('Camera error:', error);
    setCameraAvailable(false);
    setIsScanning(false);
  };

  const processQRCode = useCallback(async (qrCode) => {
    setIsProcessing(true);
    
    try {
      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const employee = mockEmployees?.[qrCode];
      const currentTime = new Date();
      const currentHour = currentTime?.getHours();
      
      if (!employee) {
        setAttendanceConfirmation({
          status: 'error',
          title: 'Invalid QR Code',
          message: 'The scanned QR code is not valid or has expired. Please try again with a valid code.',
          qrCode
        });
        return;
      }

      // Check if already marked attendance today (mock check)
      const hasMarkedToday = Math.random() > 0.8; // 20% chance of duplicate
      
      if (hasMarkedToday) {
        setAttendanceConfirmation({
          status: 'warning',
          title: 'Already Marked',
          message: `Attendance for ${employee?.name} has already been marked today.`,
          employeeName: employee?.name,
          employeeId: employee?.id,
          timestamp: currentTime?.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            month: 'short',
            day: 'numeric'
          })
        });
        return;
      }

      // Determine attendance status based on time
      let attendanceStatus = 'Present';
      if (currentHour >= 9 && currentHour < 10) {
        attendanceStatus = 'Late';
      } else if (currentHour >= 10) {
        attendanceStatus = 'Late';
      }

      setAttendanceConfirmation({
        status: 'success',
        title: 'Attendance Marked Successfully',
        message: `Welcome ${employee?.name}! Your attendance has been recorded.`,
        employeeName: employee?.name,
        employeeId: employee?.id,
        attendanceStatus,
        timestamp: currentTime?.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          month: 'short',
          day: 'numeric'
        }),
        qrCode
      });

    } catch (error) {
      console.error('Processing error:', error);
      setAttendanceConfirmation({
        status: 'error',
        title: 'Processing Error',
        message: 'An error occurred while processing your attendance. Please try again.',
        qrCode
      });
    } finally {
      setIsProcessing(false);
      setIsScanning(false);
    }
  }, [mockEmployees]);

  const handleQRCodeDetected = useCallback((qrCode) => {
    if (!isProcessing) {
      processQRCode(qrCode);
    }
  }, [isProcessing, processQRCode]);

  const handleQRCodeSubmit = useCallback((qrCode) => {
    processQRCode(qrCode);
  }, [processQRCode]);

  const handleCloseConfirmation = () => {
    setAttendanceConfirmation(null);
    if (attendanceConfirmation?.status === 'success') {
      navigate('/dashboard');
    }
  };

  const handleMarkAnother = () => {
    setAttendanceConfirmation(null);
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Camera" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Camera Attendance</h1>
                  <p className="text-muted-foreground">Scan QR codes to mark attendance</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Dashboard
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/attendance-records')}
                  iconName="FileText"
                  iconPosition="left"
                >
                  View Records
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Camera Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Camera Feed */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">QR Code Scanner</h2>
                  <div className="flex items-center space-x-2">
                    {!isScanning && cameraAvailable && (
                      <Button
                        variant="default"
                        onClick={handleStartScanning}
                        iconName="Play"
                        iconPosition="left"
                        disabled={isProcessing}
                      >
                        Start Scanning
                      </Button>
                    )}
                    
                    {isScanning && (
                      <Button
                        variant="outline"
                        onClick={handleStopScanning}
                        iconName="Square"
                        iconPosition="left"
                      >
                        Stop Scanning
                      </Button>
                    )}
                  </div>
                </div>

                <CameraFeed
                  onQRCodeDetected={handleQRCodeDetected}
                  isScanning={isScanning}
                  onCameraError={handleCameraError}
                />

                {/* Processing Indicator */}
                {isProcessing && (
                  <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      <span className="text-sm text-primary font-medium">Processing attendance...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Manual QR Entry */}
              <ManualQREntry
                onQRCodeSubmit={handleQRCodeSubmit}
                isProcessing={isProcessing}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Scanning Instructions */}
              <ScanningInstructions isVisible={showInstructions} />
              
              {/* Recent Attendance */}
              <RecentAttendance
                recentEntries={recentEntries}
                currentStats={currentStats}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Attendance Confirmation Modal */}
      {attendanceConfirmation && (
        <AttendanceConfirmation
          attendanceData={attendanceConfirmation}
          onClose={handleCloseConfirmation}
          onMarkAnother={handleMarkAnother}
        />
      )}
    </div>
  );
};

export default CameraAttendance;
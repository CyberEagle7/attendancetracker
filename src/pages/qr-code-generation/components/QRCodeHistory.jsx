import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QRCodeHistory = ({ onRegenerate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock QR code history data
  const qrHistory = [
    {
      id: 'qr001',
      userName: 'John Smith',
      employeeId: 'EMP001',
      eventType: 'Check In',
      generatedAt: '2025-01-14 09:15:00',
      validUntil: '2025-01-15 09:15:00',
      status: 'active',
      usageCount: 3,
      lastUsed: '2025-01-14 14:30:00'
    },
    {
      id: 'qr002',
      userName: 'Sarah Johnson',
      employeeId: 'EMP002',
      eventType: 'Meeting Attendance',
      generatedAt: '2025-01-14 08:45:00',
      validUntil: '2025-01-14 17:45:00',
      status: 'expired',
      usageCount: 1,
      lastUsed: '2025-01-14 10:15:00'
    },
    {
      id: 'qr003',
      userName: 'Michael Brown',
      employeeId: 'EMP003',
      eventType: 'Check Out',
      generatedAt: '2025-01-14 07:30:00',
      validUntil: '2025-01-15 07:30:00',
      status: 'active',
      usageCount: 0,
      lastUsed: null
    },
    {
      id: 'qr004',
      userName: 'Emily Davis',
      employeeId: 'EMP004',
      eventType: 'Training Session',
      generatedAt: '2025-01-13 16:20:00',
      validUntil: '2025-01-14 16:20:00',
      status: 'expired',
      usageCount: 5,
      lastUsed: '2025-01-14 11:45:00'
    },
    {
      id: 'qr005',
      userName: 'David Wilson',
      employeeId: 'EMP005',
      eventType: 'Break Start',
      generatedAt: '2025-01-14 10:00:00',
      validUntil: '2025-01-15 10:00:00',
      status: 'active',
      usageCount: 2,
      lastUsed: '2025-01-14 15:20:00'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'expired':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'CheckCircle';
      case 'expired':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const filteredHistory = qrHistory?.filter(item =>
    item?.userName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.employeeId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.eventType?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleRegenerate = (historyItem) => {
    onRegenerate({
      userId: historyItem?.employeeId?.toLowerCase()?.replace('emp', 'user'),
      userName: historyItem?.userName,
      employeeId: historyItem?.employeeId,
      eventType: historyItem?.eventType?.toLowerCase()?.replace(' ', '-'),
      validityDuration: '24'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="History" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">QR Code History</h3>
            <p className="text-sm text-muted-foreground">Previously generated QR codes</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredHistory?.length} codes
        </div>
      </div>
      {/* Search */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search by user name, employee ID, or event type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* History List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredHistory?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-muted-foreground">No QR codes found matching your search</p>
          </div>
        ) : (
          filteredHistory?.map((item) => (
            <div key={item?.id} className="bg-muted/50 rounded-lg p-4 border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-medium text-foreground mr-3">{item?.userName}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                      <Icon name={getStatusIcon(item?.status)} size={12} className="mr-1" />
                      {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Employee ID:</span> {item?.employeeId}
                    </div>
                    <div>
                      <span className="font-medium">Event:</span> {item?.eventType}
                    </div>
                    <div>
                      <span className="font-medium">Generated:</span> {new Date(item.generatedAt)?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Valid Until:</span> {new Date(item.validUntil)?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Usage Count:</span> {item?.usageCount}
                    </div>
                    <div>
                      <span className="font-medium">Last Used:</span> {item?.lastUsed ? new Date(item.lastUsed)?.toLocaleString() : 'Never'}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={() => handleRegenerate(item)}
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QRCodeHistory;
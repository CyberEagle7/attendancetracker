import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkGenerationModal = ({ isOpen, onClose, onGenerate }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [bulkSettings, setBulkSettings] = useState({
    eventType: 'check-in',
    validityDuration: '24'
  });

  // Mock user data
  const allUsers = [
    { id: 'user1', name: 'John Smith', employeeId: 'EMP001', department: 'Engineering' },
    { id: 'user2', name: 'Sarah Johnson', employeeId: 'EMP002', department: 'Marketing' },
    { id: 'user3', name: 'Michael Brown', employeeId: 'EMP003', department: 'Engineering' },
    { id: 'user4', name: 'Emily Davis', employeeId: 'EMP004', department: 'HR' },
    { id: 'user5', name: 'David Wilson', employeeId: 'EMP005', department: 'Sales' },
    { id: 'user6', name: 'Lisa Anderson', employeeId: 'EMP006', department: 'Marketing' },
    { id: 'user7', name: 'Robert Taylor', employeeId: 'EMP007', department: 'Engineering' },
    { id: 'user8', name: 'Jennifer Martinez', employeeId: 'EMP008', department: 'HR' }
  ];

  const eventTypes = [
    { value: 'check-in', label: 'Check In' },
    { value: 'check-out', label: 'Check Out' },
    { value: 'meeting', label: 'Meeting Attendance' },
    { value: 'training', label: 'Training Session' }
  ];

  const validityOptions = [
    { value: '1', label: '1 Hour' },
    { value: '4', label: '4 Hours' },
    { value: '8', label: '8 Hours' },
    { value: '24', label: '24 Hours' },
    { value: '72', label: '3 Days' },
    { value: '168', label: '1 Week' }
  ];

  const handleUserToggle = (userId) => {
    setSelectedUsers(prev =>
      prev?.includes(userId)
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === allUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(allUsers?.map(user => user?.id));
    }
  };

  const handleGenerate = () => {
    if (selectedUsers?.length === 0) return;

    const selectedUserData = allUsers?.filter(user => selectedUsers?.includes(user?.id));
    onGenerate({
      users: selectedUserData,
      settings: bulkSettings
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
              <Icon name="Users" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Bulk QR Generation</h2>
              <p className="text-sm text-muted-foreground">Generate QR codes for multiple users</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Bulk Settings */}
          <div className="mb-6 space-y-4">
            <h3 className="font-medium text-foreground">Generation Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Event Type"
                options={eventTypes}
                value={bulkSettings?.eventType}
                onChange={(value) => setBulkSettings(prev => ({ ...prev, eventType: value }))}
                required
              />
              <Select
                label="Validity Duration"
                options={validityOptions}
                value={bulkSettings?.validityDuration}
                onChange={(value) => setBulkSettings(prev => ({ ...prev, validityDuration: value }))}
                required
              />
            </div>
          </div>

          {/* User Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Select Users</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                iconName={selectedUsers?.length === allUsers?.length ? "CheckSquare" : "Square"}
                iconPosition="left"
              >
                {selectedUsers?.length === allUsers?.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto border border-border rounded-lg p-4">
              {allUsers?.map((user) => (
                <div key={user?.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-md">
                  <Checkbox
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={() => handleUserToggle(user?.id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{user?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user?.employeeId} • {user?.department}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              {selectedUsers?.length} of {allUsers?.length} users selected
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedUsers?.length} QR codes will be generated
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleGenerate}
              disabled={selectedUsers?.length === 0}
              iconName="QrCode"
              iconPosition="left"
            >
              Generate QR Codes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkGenerationModal;
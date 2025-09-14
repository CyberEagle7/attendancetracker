import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QRGenerationForm = ({ onGenerate, loading }) => {
  const [formData, setFormData] = useState({
    userId: '',
    eventType: 'check-in',
    validityDuration: '24',
    customNote: ''
  });

  const [errors, setErrors] = useState({});

  // Mock user data
  const users = [
    { value: 'user1', label: 'John Smith (EMP001)', employeeId: 'EMP001' },
    { value: 'user2', label: 'Sarah Johnson (EMP002)', employeeId: 'EMP002' },
    { value: 'user3', label: 'Michael Brown (EMP003)', employeeId: 'EMP003' },
    { value: 'user4', label: 'Emily Davis (EMP004)', employeeId: 'EMP004' },
    { value: 'user5', label: 'David Wilson (EMP005)', employeeId: 'EMP005' },
    { value: 'user6', label: 'Lisa Anderson (EMP006)', employeeId: 'EMP006' },
    { value: 'user7', label: 'Robert Taylor (EMP007)', employeeId: 'EMP007' },
    { value: 'user8', label: 'Jennifer Martinez (EMP008)', employeeId: 'EMP008' }
  ];

  const eventTypes = [
    { value: 'check-in', label: 'Check In' },
    { value: 'check-out', label: 'Check Out' },
    { value: 'break-start', label: 'Break Start' },
    { value: 'break-end', label: 'Break End' },
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.userId) {
      newErrors.userId = 'Please select a user';
    }

    if (!formData?.eventType) {
      newErrors.eventType = 'Please select an event type';
    }

    if (!formData?.validityDuration) {
      newErrors.validityDuration = 'Please select validity duration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const selectedUser = users?.find(user => user?.value === formData?.userId);
      onGenerate({
        ...formData,
        userName: selectedUser?.label?.split(' (')?.[0],
        employeeId: selectedUser?.employeeId
      });
    }
  };

  const handleBulkGenerate = () => {
    if (validateForm()) {
      const selectedUser = users?.find(user => user?.value === formData?.userId);
      onGenerate({
        ...formData,
        userName: selectedUser?.label?.split(' (')?.[0],
        employeeId: selectedUser?.employeeId,
        isBulk: true
      });
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
          <Icon name="QrCode" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Generate QR Code</h2>
          <p className="text-sm text-muted-foreground">Create attendance QR codes for users</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Selection */}
        <Select
          label="Select User"
          description="Choose the user for whom to generate the QR code"
          options={users}
          value={formData?.userId}
          onChange={(value) => handleInputChange('userId', value)}
          error={errors?.userId}
          required
          searchable
          placeholder="Search and select user..."
        />

        {/* Event Type */}
        <Select
          label="Event Type"
          description="Specify the type of attendance event"
          options={eventTypes}
          value={formData?.eventType}
          onChange={(value) => handleInputChange('eventType', value)}
          error={errors?.eventType}
          required
          placeholder="Select event type..."
        />

        {/* Validity Duration */}
        <Select
          label="Validity Duration"
          description="How long should this QR code remain valid"
          options={validityOptions}
          value={formData?.validityDuration}
          onChange={(value) => handleInputChange('validityDuration', value)}
          error={errors?.validityDuration}
          required
          placeholder="Select validity period..."
        />

        {/* Custom Note */}
        <Input
          label="Custom Note (Optional)"
          type="text"
          placeholder="Add any additional notes or instructions..."
          value={formData?.customNote}
          onChange={(e) => handleInputChange('customNote', e?.target?.value)}
          description="Optional note to include with the QR code"
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="default"
            loading={loading}
            iconName="QrCode"
            iconPosition="left"
            className="flex-1"
          >
            Generate QR Code
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleBulkGenerate}
            iconName="Users"
            iconPosition="left"
            className="flex-1"
            disabled={loading}
          >
            Bulk Generate
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QRGenerationForm;
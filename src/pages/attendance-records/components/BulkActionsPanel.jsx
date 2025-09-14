import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsPanel = ({ selectedRecords, onBulkAction, isVisible }) => {
  const [bulkAction, setBulkAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'mark-present', label: 'Mark as Present' },
    { value: 'mark-absent', label: 'Mark as Absent' },
    { value: 'mark-late', label: 'Mark as Late' },
    { value: 'delete', label: 'Delete Records' }
  ];

  const handleBulkAction = async () => {
    if (!bulkAction || selectedRecords?.length === 0) return;
    
    setIsProcessing(true);
    try {
      await onBulkAction(bulkAction, selectedRecords);
      setBulkAction('');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isVisible || selectedRecords?.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-96">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedRecords?.length} record{selectedRecords?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Select
              options={actionOptions}
              value={bulkAction}
              onChange={setBulkAction}
              placeholder="Choose action..."
            />
          </div>
          
          <Button
            variant="default"
            onClick={handleBulkAction}
            disabled={!bulkAction || isProcessing}
            loading={isProcessing}
            iconName="Play"
            iconPosition="left"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsPanel;
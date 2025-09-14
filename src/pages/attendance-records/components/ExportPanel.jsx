import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportPanel = ({ selectedRecords, totalRecords, onExport }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV File' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Spreadsheet' }
  ];

  const handleExport = async (type) => {
    setIsExporting(true);
    try {
      await onExport(type, exportFormat);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Download" size={20} className="text-muted-foreground" />
        <h3 className="font-medium text-foreground">Export Data</h3>
      </div>
      <div className="space-y-4">
        <Select
          label="Export Format"
          options={formatOptions}
          value={exportFormat}
          onChange={setExportFormat}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleExport('selected')}
            disabled={selectedRecords?.length === 0 || isExporting}
            loading={isExporting}
            iconName="FileDown"
            iconPosition="left"
            fullWidth
          >
            Export Selected ({selectedRecords?.length})
          </Button>

          <Button
            variant="default"
            onClick={() => handleExport('all')}
            disabled={isExporting}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Export All ({totalRecords})
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>• CSV: Comma-separated values for spreadsheet applications</p>
          <p>• PDF: Formatted report with company branding</p>
          <p>• Excel: Native Excel format with formulas and charts</p>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
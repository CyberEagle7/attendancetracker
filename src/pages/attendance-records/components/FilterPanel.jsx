import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  recordCount,
  isMobile = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'half-day', label: 'Half Day' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={filters?.startDate}
              onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              placeholder="Start Date"
            />
            <Input
              type="date"
              value={filters?.endDate}
              onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              placeholder="End Date"
            />
          </div>
        </div>

        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Input
          label="Search Employee"
          type="search"
          placeholder="Search by name or ID..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="text-sm text-muted-foreground">
          {recordCount} records found
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              Filtered
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <span className="font-medium text-foreground">Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-primary rounded-full"></span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
        {isExpanded && (
          <div className="p-4">
            <FilterContent />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Filter" size={20} className="text-muted-foreground" />
        <h3 className="font-medium text-foreground">Filter Records</h3>
      </div>
      <FilterContent />
    </div>
  );
};

export default FilterPanel;
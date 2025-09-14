import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceTable = ({ 
  records, 
  sortConfig, 
  onSort, 
  selectedRecords, 
  onSelectRecord, 
  onSelectAll,
  currentPage,
  recordsPerPage,
  onPageChange,
  totalRecords
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (recordId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(recordId)) {
      newExpanded?.delete(recordId);
    } else {
      newExpanded?.add(recordId);
    }
    setExpandedRows(newExpanded);
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { color: 'bg-success text-success-foreground', label: 'Present' },
      absent: { color: 'bg-error text-error-foreground', label: 'Absent' },
      late: { color: 'bg-warning text-warning-foreground', label: 'Late' },
      'half-day': { color: 'bg-secondary text-secondary-foreground', label: 'Half Day' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.absent;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRecords?.length === records?.length && records?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'employeeName', label: 'Employee' },
                { key: 'date', label: 'Date' },
                { key: 'checkIn', label: 'Check In' },
                { key: 'checkOut', label: 'Check Out' },
                { key: 'duration', label: 'Duration' },
                { key: 'status', label: 'Status' }
              ]?.map((column) => (
                <th
                  key={column?.key}
                  className="px-4 py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => onSort(column?.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column?.label}</span>
                    {getSortIcon(column?.key)}
                  </div>
                </th>
              ))}
              <th className="w-16 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {records?.map((record) => (
              <tr key={record?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRecords?.includes(record?.id)}
                    onChange={() => onSelectRecord(record?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {record?.employeeName?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{record?.employeeName}</div>
                      <div className="text-sm text-muted-foreground">{record?.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">{record?.date}</td>
                <td className="px-4 py-3 text-sm text-foreground">{record?.checkIn || '-'}</td>
                <td className="px-4 py-3 text-sm text-foreground">{record?.checkOut || '-'}</td>
                <td className="px-4 py-3 text-sm text-foreground">{formatDuration(record?.duration)}</td>
                <td className="px-4 py-3">{getStatusBadge(record?.status)}</td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {records?.map((record) => (
          <div key={record?.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedRecords?.includes(record?.id)}
                  onChange={() => onSelectRecord(record?.id)}
                  className="rounded border-border"
                />
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {record?.employeeName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">{record?.employeeName}</div>
                  <div className="text-sm text-muted-foreground">{record?.employeeId}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleRowExpansion(record?.id)}
              >
                <Icon 
                  name={expandedRows?.has(record?.id) ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Date:</span>
              <span className="text-sm font-medium text-foreground">{record?.date}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              {getStatusBadge(record?.status)}
            </div>

            {expandedRows?.has(record?.id) && (
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Check In:</span>
                  <span className="text-sm font-medium text-foreground">{record?.checkIn || '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Check Out:</span>
                  <span className="text-sm font-medium text-foreground">{record?.checkOut || '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="text-sm font-medium text-foreground">{formatDuration(record?.duration)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {startRecord} to {endRecord} of {totalRecords} records
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <Icon name="ChevronLeft" size={16} />
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
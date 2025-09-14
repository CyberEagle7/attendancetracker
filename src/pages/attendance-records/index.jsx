import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AttendanceTable from './components/AttendanceTable';
import FilterPanel from './components/FilterPanel';
import SummaryPanel from './components/SummaryPanel';
import ExportPanel from './components/ExportPanel';
import BulkActionsPanel from './components/BulkActionsPanel';

const AttendanceRecords = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    department: '',
    status: '',
    search: ''
  });
  const [summaryData, setSummaryData] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Mock attendance records data
  const mockRecords = [
    {
      id: 1,
      employeeName: "Sarah Johnson",
      employeeId: "EMP001",
      department: "engineering",
      date: "2025-01-14",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      duration: 540,
      status: "present"
    },
    {
      id: 2,
      employeeName: "Michael Chen",
      employeeId: "EMP002",
      department: "marketing",
      date: "2025-01-14",
      checkIn: "09:15 AM",
      checkOut: "06:15 PM",
      duration: 540,
      status: "late"
    },
    {
      id: 3,
      employeeName: "Emily Rodriguez",
      employeeId: "EMP003",
      department: "sales",
      date: "2025-01-14",
      checkIn: null,
      checkOut: null,
      duration: 0,
      status: "absent"
    },
    {
      id: 4,
      employeeName: "David Kim",
      employeeId: "EMP004",
      department: "hr",
      date: "2025-01-14",
      checkIn: "09:00 AM",
      checkOut: "01:00 PM",
      duration: 240,
      status: "half-day"
    },
    {
      id: 5,
      employeeName: "Lisa Thompson",
      employeeId: "EMP005",
      department: "finance",
      date: "2025-01-14",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      duration: 540,
      status: "present"
    },
    {
      id: 6,
      employeeName: "James Wilson",
      employeeId: "EMP006",
      department: "engineering",
      date: "2025-01-13",
      checkIn: "09:30 AM",
      checkOut: "06:30 PM",
      duration: 540,
      status: "late"
    },
    {
      id: 7,
      employeeName: "Anna Martinez",
      employeeId: "EMP007",
      department: "marketing",
      date: "2025-01-13",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      duration: 540,
      status: "present"
    },
    {
      id: 8,
      employeeName: "Robert Brown",
      employeeId: "EMP008",
      department: "sales",
      date: "2025-01-13",
      checkIn: null,
      checkOut: null,
      duration: 0,
      status: "absent"
    },
    {
      id: 9,
      employeeName: "Jennifer Davis",
      employeeId: "EMP009",
      department: "hr",
      date: "2025-01-13",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      duration: 540,
      status: "present"
    },
    {
      id: 10,
      employeeName: "Thomas Anderson",
      employeeId: "EMP010",
      department: "finance",
      date: "2025-01-13",
      checkIn: "09:10 AM",
      checkOut: "06:10 PM",
      duration: 540,
      status: "late"
    }
  ];

  useEffect(() => {
    setRecords(mockRecords);
    setFilteredRecords(mockRecords);
    calculateSummaryData(mockRecords);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortConfig, records]);

  const calculateSummaryData = (recordsData) => {
    const totalHours = recordsData?.reduce((sum, record) => sum + (record?.duration || 0), 0);
    const presentRecords = recordsData?.filter(record => record?.status === 'present' || record?.status === 'late');
    const attendanceRate = recordsData?.length > 0 ? Math.round((presentRecords?.length / recordsData?.length) * 100) : 0;
    const todayRecords = recordsData?.filter(record => record?.date === '2025-01-14');
    const presentToday = todayRecords?.filter(record => record?.status === 'present' || record?.status === 'late')?.length;
    const lateArrivals = recordsData?.filter(record => record?.status === 'late')?.length;

    setSummaryData({
      totalHours: Math.round(totalHours / 60) + 'h',
      attendanceRate,
      presentToday,
      lateArrivals
    });
  };

  const applyFiltersAndSort = () => {
    let filtered = [...records];

    // Apply filters
    if (filters?.startDate) {
      filtered = filtered?.filter(record => record?.date >= filters?.startDate);
    }
    if (filters?.endDate) {
      filtered = filtered?.filter(record => record?.date <= filters?.endDate);
    }
    if (filters?.department) {
      filtered = filtered?.filter(record => record?.department === filters?.department);
    }
    if (filters?.status) {
      filtered = filtered?.filter(record => record?.status === filters?.status);
    }
    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter(record => 
        record?.employeeName?.toLowerCase()?.includes(searchLower) ||
        record?.employeeId?.toLowerCase()?.includes(searchLower)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredRecords(filtered);
    calculateSummaryData(filtered);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      department: '',
      status: '',
      search: ''
    });
  };

  const handleSelectRecord = (recordId) => {
    setSelectedRecords(prev => 
      prev?.includes(recordId) 
        ? prev?.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleSelectAll = () => {
    const currentPageRecords = getCurrentPageRecords();
    const allSelected = currentPageRecords?.every(record => selectedRecords?.includes(record?.id));
    
    if (allSelected) {
      setSelectedRecords(prev => prev?.filter(id => !currentPageRecords?.some(record => record?.id === id)));
    } else {
      const newSelections = currentPageRecords?.map(record => record?.id);
      setSelectedRecords(prev => [...new Set([...prev, ...newSelections])]);
    }
  };

  const handleExport = async (type, format) => {
    const recordsToExport = type === 'selected' 
      ? filteredRecords?.filter(record => selectedRecords?.includes(record?.id))
      : filteredRecords;

    // Mock export functionality
    console.log(`Exporting ${recordsToExport?.length} records in ${format} format`);
    
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`Successfully exported ${recordsToExport?.length} records as ${format?.toUpperCase()}`);
  };

  const handleBulkAction = async (action, recordIds) => {
    console.log(`Performing bulk action: ${action} on records:`, recordIds);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock bulk action implementation
    if (action === 'delete') {
      setRecords(prev => prev?.filter(record => !recordIds?.includes(record?.id)));
      alert(`Successfully deleted ${recordIds?.length} records`);
    } else {
      alert(`Successfully applied ${action} to ${recordIds?.length} records`);
    }
    
    setSelectedRecords([]);
  };

  const getCurrentPageRecords = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filteredRecords?.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Attendance Records</h1>
              <p className="text-muted-foreground mt-2">
                View and manage employee attendance data with advanced filtering and export options
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="outline" iconName="RefreshCw" iconPosition="left">
                Refresh
              </Button>
              <Button variant="default" iconName="Plus" iconPosition="left">
                Add Record
              </Button>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="mb-8">
            <SummaryPanel summaryData={summaryData} />
          </div>

          {/* Filter Panel */}
          <div className="mb-6">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              recordCount={filteredRecords?.length}
              isMobile={isMobile}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <AttendanceTable
                records={getCurrentPageRecords()}
                sortConfig={sortConfig}
                onSort={handleSort}
                selectedRecords={selectedRecords}
                onSelectRecord={handleSelectRecord}
                onSelectAll={handleSelectAll}
                currentPage={currentPage}
                recordsPerPage={recordsPerPage}
                onPageChange={handlePageChange}
                totalRecords={filteredRecords?.length}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ExportPanel
                selectedRecords={selectedRecords}
                totalRecords={filteredRecords?.length}
                onExport={handleExport}
              />
            </div>
          </div>

          {/* Mobile Action Buttons */}
          {isMobile && (
            <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
              <Button variant="default" size="icon" className="w-14 h-14 rounded-full shadow-lg">
                <Icon name="Plus" size={24} />
              </Button>
              <Button variant="outline" size="icon" className="w-14 h-14 rounded-full shadow-lg bg-card">
                <Icon name="RefreshCw" size={24} />
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* Bulk Actions Panel */}
      <BulkActionsPanel
        selectedRecords={selectedRecords}
        onBulkAction={handleBulkAction}
        isVisible={selectedRecords?.length > 0}
      />
    </div>
  );
};

export default AttendanceRecords;
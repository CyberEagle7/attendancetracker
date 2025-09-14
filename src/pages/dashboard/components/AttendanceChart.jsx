import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AttendanceChart = () => {
  const weeklyData = [
    { day: 'Mon', present: 85, absent: 15, late: 8 },
    { day: 'Tue', present: 92, absent: 8, late: 5 },
    { day: 'Wed', present: 88, absent: 12, late: 12 },
    { day: 'Thu', present: 90, absent: 10, late: 7 },
    { day: 'Fri', present: 87, absent: 13, late: 9 },
    { day: 'Sat', present: 45, absent: 55, late: 3 },
    { day: 'Sun', present: 0, absent: 100, late: 0 }
  ];

  const departmentData = [
    { name: 'Engineering', value: 45, color: '#1E40AF' },
    { name: 'Marketing', value: 25, color: '#059669' },
    { name: 'Sales', value: 20, color: '#F59E0B' },
    { name: 'HR', value: 10, color: '#EF4444' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-popover-foreground">
            {data?.name}: {data?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Weekly Attendance Trends */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Weekly Attendance Trends</h3>
        </div>

        <div className="w-full h-64" aria-label="Weekly Attendance Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="present" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="late" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="absent" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Late</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Absent</span>
          </div>
        </div>
      </div>
      {/* Department Distribution */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Department Distribution</h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-1/2 h-48" aria-label="Department Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-1/2 space-y-3">
            {departmentData?.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: dept?.color }}
                  ></div>
                  <span className="text-sm font-medium text-foreground">{dept?.name}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{dept?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
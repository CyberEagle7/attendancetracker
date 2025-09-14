import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryPanel = ({ summaryData }) => {
  const summaryCards = [
    {
      title: 'Total Hours',
      value: summaryData?.totalHours,
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Attendance Rate',
      value: `${summaryData?.attendanceRate}%`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Present Today',
      value: summaryData?.presentToday,
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Late Arrivals',
      value: summaryData?.lateArrivals,
      icon: 'AlertCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryCards?.map((card, index) => (
        <div key={index} className="bg-card rounded-lg border border-border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card?.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{card?.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${card?.bgColor} flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryPanel;